import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import KPICard from '@/components/KPICard';
import QuickActions from '@/components/QuickActions';
import SalesChart from '@/components/SalesChart';
import InventoryAlert from '@/components/InventoryAlert';
import BottomNav from '@/components/BottomNav';
import AddCustomerDialog from '@/components/AddCustomerDialog';
import { storage } from '@/utils/storage';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [inventory] = useState(storage.getInventory());
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const company = storage.getCurrentCompany();
  const invoices = storage.getInvoices();

  const kpis = useMemo(() => {
    const totalSales = invoices
      .filter(inv => inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const totalExpenses = 0;
    const profit = totalSales - totalExpenses;

    return { sales: totalSales, expenses: totalExpenses, profit };
  }, [invoices]);

  const trends = useMemo(() => {
    const monthlyData: { [key: string]: { sales: number; count: number } } = {};
    
    invoices.forEach(inv => {
      if (inv.status !== 'Paid') return;
      
      const date = new Date(inv.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { sales: 0, count: 0 };
      }
      
      monthlyData[monthKey].sales += inv.total;
      monthlyData[monthKey].count += 1;
    });

    const now = new Date();
    const last5Months = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (4 - i), 1);
      return d.toLocaleDateString('en-US', { month: 'short' });
    });

    return last5Months.map(month => ({
      month,
      sales: monthlyData[month]?.sales || 0,
      expenses: 0,
    }));
  }, [invoices]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-card border-b border-card-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{company?.name || 'Welcome'}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            label="Total Sales"
            value={kpis.sales}
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <KPICard
            label="Total Expenses"
            value={kpis.expenses}
            icon={Wallet}
            trend={{ value: 3.2, isPositive: false }}
          />
          <KPICard
            label="Profit/Loss"
            value={kpis.profit}
            icon={TrendingUp}
            trend={{ value: 8.1, isPositive: kpis.profit > 0 }}
          />
        </div>

        <QuickActions
          onCreateInvoice={() => setLocation('/new-invoice')}
          onAddCustomer={() => setShowAddCustomer(true)}
          onRecordExpense={() => console.log('Record Expense')}
          onAddStock={() => console.log('Add Stock')}
        />

        <AddCustomerDialog
          open={showAddCustomer}
          onOpenChange={setShowAddCustomer}
        />

        <SalesChart data={trends} />

        <InventoryAlert items={inventory} />
      </main>

      <BottomNav />
    </div>
  );
}
