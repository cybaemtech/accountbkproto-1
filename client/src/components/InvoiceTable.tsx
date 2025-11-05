import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Invoice, Customer } from '@/utils/storage';
import { formatCurrency, formatDate } from '@/utils/formatters';
import StatusBadge from './StatusBadge';

interface InvoiceTableProps {
  invoices: Invoice[];
  customers: Customer[];
  onViewInvoice?: (invoice: Invoice) => void;
}

export default function InvoiceTable({ invoices, customers, onViewInvoice }: InvoiceTableProps) {
  const getCustomerName = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown';
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Invoice ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Customer
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Due Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map(invoice => (
              <tr 
                key={invoice.id} 
                className="hover-elevate"
                data-testid={`invoice-row-${invoice.id}`}
              >
                <td className="px-4 py-3">
                  <span className="text-sm font-mono font-medium text-foreground">
                    {invoice.invoiceNumber}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">
                    {getCustomerName(invoice.customerId)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-semibold font-mono text-foreground">
                    {formatCurrency(invoice.total)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(invoice.dueDate)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewInvoice?.(invoice)}
                    data-testid={`button-view-invoice-${invoice.id}`}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
