import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { storage } from '@/utils/storage';
import { useLocation } from 'wouter';
import { Building2, User, LogOut } from 'lucide-react';

export default function Settings() {
  const [, setLocation] = useLocation();
  const company = storage.getCurrentCompany();
  const user = storage.getCurrentUser();

  const handleLogout = () => {
    storage.setCurrentUser(null);
    storage.setCurrentCompany(null);
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-card border-b border-card-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
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
              onClick={() => setLocation('/company-setup')}
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
      </main>

      <BottomNav />
    </div>
  );
}
