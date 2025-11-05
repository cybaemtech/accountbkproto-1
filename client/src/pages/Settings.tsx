import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { Building2, User, LogOut } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const company = storage.getCurrentCompany();
  const user = storage.getCurrentUser();

  const handleLogout = () => {
    storage.setCurrentUser(null);
    storage.setCurrentCompany(null);
    navigate('/');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

      <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Account</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </Card>

        {company && (
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Current Company</h3>
                <p className="text-sm text-muted-foreground mb-1">{company.name}</p>
                <p className="text-xs text-muted-foreground">GST: {company.gst}</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/company-setup')}
              data-testid="button-add-company"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Add New Company
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>
    </div>
  );
}
