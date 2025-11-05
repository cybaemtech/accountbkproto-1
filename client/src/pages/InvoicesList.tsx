import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';
import InvoiceTable from '@/components/InvoiceTable';
import BottomNav from '@/components/BottomNav';
import { storage } from '@/utils/storage';
import { formatCurrency, exportToCSV, getAgingCategory } from '@/utils/formatters';

export default function InvoicesList() {
  const [, setLocation] = useLocation();
  const [invoices] = useState(storage.getInvoices());
  const [customers] = useState(storage.getCustomers());
  const [filter, setFilter] = useState<'all' | 'Paid' | 'Pending' | 'Overdue'>('all');

  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(inv => inv.status === filter);

  const aging = {
    '0-30': 0,
    '30-60': 0,
    '60+': 0,
  };

  invoices.filter(inv => inv.status !== 'Paid').forEach(inv => {
    const category = getAgingCategory(inv.dueDate);
    aging[category] += inv.total;
  });

  const handleExportCSV = () => {
    const exportData = invoices.map(inv => ({
      'Invoice Number': inv.invoiceNumber,
      'Customer': customers.find(c => c.id === inv.customerId)?.name || '',
      'Date': inv.date,
      'Due Date': inv.dueDate,
      'Amount': inv.total,
      'Status': inv.status,
    }));
    exportToCSV(exportData, 'invoices.csv');
  };

  const filters: Array<{ value: typeof filter; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-card border-b border-card-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Invoices</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              data-testid="button-download-csv"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={() => setLocation('/new-invoice')}
              data-testid="button-new-invoice"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <Button
              key={f.value}
              variant={filter === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f.value)}
              data-testid={`filter-${f.value}`}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Aging Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(aging).map(([period, amount]) => (
              <Card key={period} className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  {period} Days
                </p>
                <p className="text-xl font-bold text-foreground font-mono">
                  {formatCurrency(amount)}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {filter === 'all' ? 'All Invoices' : `${filter} Invoices`}
          </h2>
          <InvoiceTable
            invoices={filteredInvoices}
            customers={customers}
            onViewInvoice={(invoice) => console.log('View invoice:', invoice)}
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
