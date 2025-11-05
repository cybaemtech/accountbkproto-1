import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { storage, initializeSeedData } from '@/utils/storage';
import { Building2 } from 'lucide-react';

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup' | 'select-company'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  initializeSeedData();

  const handleLogin = () => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      storage.setCurrentUser(user);
      setMode('select-company');
      toast({
        title: 'Login successful',
        description: 'Please select a company to continue',
      });
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }
  };

  const handleSignup = () => {
    const users = storage.getUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      toast({
        title: 'Signup failed',
        description: 'User already exists',
        variant: 'destructive',
      });
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      email,
      password,
      companyIds: [],
    };
    
    storage.setUsers([...users, newUser]);
    storage.setCurrentUser(newUser);
    
    toast({
      title: 'Account created',
      description: 'Please set up your company',
    });
    
    setLocation('/company-setup');
  };

  const handleSelectCompany = (companyId: number) => {
    const companies = storage.getCompanies();
    const company = companies.find(c => c.id === companyId);
    
    if (company) {
      storage.setCurrentCompany(company);
      setLocation('/dashboard');
    }
  };

  if (mode === 'select-company') {
    const currentUser = storage.getCurrentUser();
    const companies = storage.getCompanies().filter(c => 
      currentUser?.companyIds.includes(c.id)
    );

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Select Company</h1>
            <p className="text-sm text-muted-foreground">Choose a company to access</p>
          </div>

          <div className="space-y-3">
            {companies.map(company => (
              <Button
                key={company.id}
                variant="outline"
                className="w-full h-auto py-4 flex items-center gap-3 hover-elevate active-elevate-2"
                onClick={() => handleSelectCompany(company.id)}
                data-testid={`button-select-company-${company.id}`}
              >
                <Building2 className="w-5 h-5" />
                <div className="text-left flex-1">
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.businessType}</p>
                </div>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => setLocation('/company-setup')}
            data-testid="button-add-new-company"
          >
            + Add New Company
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Vyapaar</h1>
          <p className="text-sm text-muted-foreground">Business accounting made simple</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="test@vyapaar.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="input-email"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-password"
              className="mt-1"
            />
          </div>

          {mode === 'login' ? (
            <>
              <Button
                className="w-full"
                onClick={handleLogin}
                data-testid="button-login"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMode('signup')}
                data-testid="button-switch-signup"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button
                className="w-full"
                onClick={handleSignup}
                data-testid="button-signup"
              >
                Create Account
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMode('login')}
                data-testid="button-switch-login"
              >
                Back to Login
              </Button>
            </>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log('Google login clicked')}
            data-testid="button-google-login"
          >
            Continue with Google
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Demo credentials: test@vyapaar.com / 123456
        </p>
      </Card>
    </div>
  );
}
