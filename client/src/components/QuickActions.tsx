import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, UserPlus, Wallet, Package } from 'lucide-react';

interface QuickActionsProps {
  onCreateInvoice?: () => void;
  onAddCustomer?: () => void;
  onRecordExpense?: () => void;
  onAddStock?: () => void;
}

export default function QuickActions({
  onCreateInvoice,
  onAddCustomer,
  onRecordExpense,
  onAddStock,
}: QuickActionsProps) {
  const actions = [
    { icon: FileText, label: 'Create Invoice', onClick: onCreateInvoice, testId: 'button-create-invoice' },
    { icon: UserPlus, label: 'Add Customer', onClick: onAddCustomer, testId: 'button-add-customer' },
    { icon: Wallet, label: 'Record Expense', onClick: onRecordExpense, testId: 'button-record-expense' },
    { icon: Package, label: 'Add Stock', onClick: onAddStock, testId: 'button-add-stock' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover-elevate active-elevate-2"
              onClick={action.onClick}
              data-testid={action.testId}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
