import React, { useEffect, useState } from 'react';
import { privateApi } from '../services/privateapi';

const avatarColors = [
  '#6C63FF', '#FF6584', '#43E6FC', '#FFD86E', '#6EE7B7', '#F472B6', '#A78BFA', '#FBBF24'
];

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await privateApi().get('/auth/profile');
        setProfile(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:'3rem'}}>Loading profile...</div>;
  if (error) return <div style={{ color: 'red', textAlign:'center', marginTop:'3rem' }}>{error}</div>;

  return (
    <div style={{
      maxWidth: 420,
      margin: '3rem auto',
      padding: 0,
      borderRadius: 20,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      background: 'rgba(255,255,255,0.95)',
      overflow: 'hidden',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      position: 'relative',
    }}>
      <div style={{
        background: 'linear-gradient(90deg, #6C63FF 0%, #43E6FC 100%)',
        height: 110,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 70,
          transform: 'translateX(-50%)',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: stringToColor(profile.name || profile.email),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          color: '#fff',
          border: '5px solid #fff',
          boxShadow: '0 4px 16px rgba(108,99,255,0.15)',
        }}>
          {profile.name ? profile.name[0].toUpperCase() : profile.email[0].toUpperCase()}
        </div>
      </div>
      <div style={{ padding: '70px 32px 32px 32px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px 0', fontWeight: 700, fontSize: 28, color: '#222' }}>{profile.name}</h2>
        <div style={{ color: '#6C63FF', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{profile.email}</div>
        <div style={{
          display: 'inline-block',
          padding: '4px 18px',
          borderRadius: 12,
          background: profile.isSeller ? 'linear-gradient(90deg,#43E6FC,#6C63FF)' : 'linear-gradient(90deg,#FFD86E,#FF6584)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 18,
          boxShadow: '0 2px 8px rgba(67,230,252,0.08)',
        }}>
          {profile.isSeller ? 'Seller' : 'Buyer'}
        </div>
        <div style={{
          margin: '18px 0 0 0',
          color: '#888',
          fontSize: 14,
          letterSpacing: 0.2,
          wordBreak: 'break-all',
        }}>
          <span style={{ fontWeight: 500 }}>User ID:</span> {profile.id}
        </div>
      </div>
    </div>
  );
};

export default Profile;