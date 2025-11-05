import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireCompany?: boolean;
}

export default function ProtectedRoute({ children, requireCompany = true }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();
  const currentCompany = storage.getCurrentCompany();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    if (requireCompany && !currentCompany) {
      navigate('/setup');
    }
  }, [currentUser, currentCompany, requireCompany, navigate]);

  if (!currentUser || (requireCompany && !currentCompany)) {
    return null;
  }

  return <>{children}</>;
}
