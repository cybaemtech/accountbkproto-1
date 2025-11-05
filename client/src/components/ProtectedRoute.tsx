import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { storage } from '@/utils/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireCompany?: boolean;
}

export default function ProtectedRoute({ children, requireCompany = true }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const currentUser = storage.getCurrentUser();
  const currentCompany = storage.getCurrentCompany();

  useEffect(() => {
    if (!currentUser) {
      setLocation('/');
      return;
    }

    if (requireCompany && !currentCompany) {
      setLocation('/');
    }
  }, [currentUser, currentCompany, requireCompany, setLocation]);

  if (!currentUser || (requireCompany && !currentCompany)) {
    return null;
  }

  return <>{children}</>;
}
