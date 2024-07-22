import { Navigate, Outlet } from 'react-router-dom';

const AuthorizedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthorizedRoute;
