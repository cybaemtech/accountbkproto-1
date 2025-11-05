import QuickActions from '../QuickActions';

export default function QuickActionsExample() {
  return (
    <div className="bg-background p-6">
      <QuickActions
        onCreateInvoice={() => console.log('Create Invoice clicked')}
        onAddCustomer={() => console.log('Add Customer clicked')}
        onRecordExpense={() => console.log('Record Expense clicked')}
        onAddStock={() => console.log('Add Stock clicked')}
      />
    </div>
  );
}
