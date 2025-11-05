import InvoiceTable from '../InvoiceTable';

export default function InvoiceTableExample() {
  const mockInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-001',
      customerId: 1,
      date: '2025-10-15',
      dueDate: '2025-11-15',
      items: [],
      subtotal: 50000,
      tax: 9000,
      total: 59000,
      status: 'Paid' as const,
    },
    {
      id: 2,
      invoiceNumber: 'INV-002',
      customerId: 2,
      date: '2025-10-20',
      dueDate: '2025-11-20',
      items: [],
      subtotal: 30000,
      tax: 5400,
      total: 35400,
      status: 'Pending' as const,
    },
  ];

  const mockCustomers = [
    { id: 1, name: 'Tommy Anderson', email: 'tommy@example.com', phone: '9876543210' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '9876543211' },
  ];

  return (
    <div className="bg-background p-6">
      <InvoiceTable 
        invoices={mockInvoices} 
        customers={mockCustomers}
        onViewInvoice={(invoice) => console.log('View invoice:', invoice)}
      />
    </div>
  );
}
