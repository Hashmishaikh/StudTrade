import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SellerDashboard from './pages/SellerDashboard';
import ProductDetails from './components/ProductDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'product/:id', element: <ProductDetails /> },
      {
        element: <PublicRoute />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'login/seller', element: <Login sellerOnly={true} /> },
          { path: 'register', element: <Register /> },
          { path: 'register/seller', element: <Register sellerOnly={true} /> },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'seller-dashboard', element: <SellerDashboard /> },
        ],
      },
      // { path: 'create', element: <CreateListing /> },
      // { path: 'product/:id', element: <ProductDetail /> },
    ],
  },
]);

export default router;