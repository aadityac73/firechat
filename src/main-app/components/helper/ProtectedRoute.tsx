import { useAuth } from 'main-app/context/auth';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const currentUser = useAuth();

  if (!currentUser) {
    return <Navigate to={'/login'} />;
  }
  return children;
};

export default ProtectedRoute;
