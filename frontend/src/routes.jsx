import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        // { path: 'create', element: <CreateListing /> },
        // { path: 'product/:id', element: <ProductDetail /> },
        { path: 'profile', element: <Profile /> },
      ],
  },
]);

export default router;