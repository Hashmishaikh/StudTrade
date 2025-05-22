import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  console.log('user', user)
  // user.user is set when logged in
  return user && user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 