import { useAuth } from 'main-app/context/auth';
import { Navigate } from 'react-router-dom';

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const currentUser = useAuth();
  if (currentUser) {
    return <Navigate to={'/'} />;
  }
  return children;
};

export default PublicRoute;
