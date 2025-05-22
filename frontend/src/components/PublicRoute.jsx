import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { user } = useAuth();
  // user.user is set when logged in
  return user && user ? <Navigate to={user?.isSeller ? "/seller-dashboard" : "/"} replace /> : <Outlet />;
};

export default PublicRoute; 