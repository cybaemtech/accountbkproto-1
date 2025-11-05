import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/storage';
import { ArrowLeft } from 'lucide-react';

export default function CompanySetup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    legalName: '',
    address: '',
    businessType: '',
    gst: '',
    gstType: '',
    state: '',
    bankName: '',
    ifsc: '',
    branch: '',
    account: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const companies = storage.getCompanies();
    const currentUser = storage.getCurrentUser();
    
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'Please login first',
        variant: 'destructive',
      });
      return;
    }

    const newCompany = {
      id: companies.length + 1,
      name: formData.name,
      legalName: formData.legalName,
      address: formData.address,
      businessType: formData.businessType,
      gst: formData.gst,
      gstType: formData.gstType,
      state: formData.state,
      bank: {
        name: formData.bankName,
        ifsc: formData.ifsc,
        branch: formData.branch,
        account: formData.account,
      },
    };

    storage.setCompanies([...companies, newCompany]);
    
    const updatedUser = {
      ...currentUser,
      companyIds: [...currentUser.companyIds, newCompany.id],
    };
    const users = storage.getUsers().map(u => u.id === currentUser.id ? updatedUser : u);
    storage.setUsers(users);
    storage.setCurrentUser(updatedUser);
    storage.setCurrentCompany(newCompany);

    toast({
      title: 'Company created',
      description: 'Your company has been set up successfully',
    });

    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Company Setup</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    data-testid="input-company-name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={formData.legalName}
                    onChange={(e) => handleChange('legalName', e.target.value)}
                    data-testid="input-legal-name"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    data-testid="input-address"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
                    data-testid="input-business-type"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">GST Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input
                    id="gst"
                    value={formData.gst}
                    onChange={(e) => handleChange('gst', e.target.value)}
                    data-testid="input-gst"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gstType">GST Type</Label>
                  <Input
                    id="gstType"
                    value={formData.gstType}
                    onChange={(e) => handleChange('gstType', e.target.value)}
                    data-testid="input-gst-type"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    data-testid="input-state"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Bank Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleChange('bankName', e.target.value)}
                    data-testid="input-bank-name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    value={formData.ifsc}
                    onChange={(e) => handleChange('ifsc', e.target.value)}
                    data-testid="input-ifsc"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={formData.branch}
                    onChange={(e) => handleChange('branch', e.target.value)}
                    data-testid="input-branch"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="account">Account Number</Label>
                  <Input
                    id="account"
                    value={formData.account}
                    onChange={(e) => handleChange('account', e.target.value)}
                    data-testid="input-account"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleSave}
              data-testid="button-save-continue"
            >
              Save & Continue
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
