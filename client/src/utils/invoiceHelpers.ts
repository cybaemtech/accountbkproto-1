import { Invoice } from './storage';

export function updateInvoiceStatuses(invoices: Invoice[]): Invoice[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return invoices.map(invoice => {
    if (invoice.status === 'Paid') {
      return invoice;
    }
    
    const dueDate = new Date(invoice.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    const isOverdue = dueDate < today;
    return {
      ...invoice,
      status: isOverdue ? 'Overdue' : 'Pending' as 'Overdue' | 'Pending',
    };
  });
}

export function markInvoiceAsPaid(invoiceId: number, invoices: Invoice[]): Invoice[] {
  return invoices.map(inv => 
    inv.id === invoiceId ? { ...inv, status: 'Paid' as const } : inv
  );
}
