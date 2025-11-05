import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle2, Plus } from 'lucide-react';
import InvoiceTable from '@/components/InvoiceTable';
import InventoryAlert from '@/components/InventoryAlert';
import BottomNav from '@/components/BottomNav';
import { storage } from '@/utils/storage';
import { formatCurrency } from '@/utils/formatters';

export default function BillingHub() {
  const [, setLocation] = useLocation();
  const [invoices] = useState(storage.getInvoices());
  const [customers] = useState(storage.getCustomers());
  const [inventory] = useState(storage.getInventory());

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalDue = invoices.filter(inv => inv.status !== 'Paid').reduce((sum, inv) => sum + inv.total, 0);
  const invoiceCount = invoices.length;

  const stats = [
    { icon: FileText, label: 'Total Billed', value: formatCurrency(totalBilled), color: 'text-primary' },
    { icon: Clock, label: 'Total Due', value: formatCurrency(totalDue), color: 'text-amber-500' },
    { icon: CheckCircle2, label: 'Invoices', value: invoiceCount.toString(), color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-card border-b border-card-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Billing Hub</h1>
          <Button
            onClick={() => setLocation('/new-invoice')}
            data-testid="button-quick-invoice"
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Invoice
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground font-mono">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 bg-primary/10 rounded-lg ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Invoices</h2>
          <InvoiceTable
            invoices={invoices.slice(0, 5)}
            customers={customers}
            onViewInvoice={(invoice) => console.log('View invoice:', invoice)}
          />
        </div>

        <InventoryAlert items={inventory} />
      </main>

      <BottomNav />
    </div>
  );
}
