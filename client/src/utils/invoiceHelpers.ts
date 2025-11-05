import { Invoice } from './storage';

export function updateInvoiceStatuses(invoices: Invoice[]): Invoice[] {
  const today = new Date().toISOString().split('T')[0];
  
  return invoices.map(invoice => {
    if (invoice.status === 'Paid') {
      return invoice;
    }
    
    const isOverdue = invoice.dueDate < today;
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
