import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import KPICard from '@/components/KPICard';
import QuickActions from '@/components/QuickActions';
import SalesChart from '@/components/SalesChart';
import InventoryAlert from '@/components/InventoryAlert';
import BottomNav from '@/components/BottomNav';
import { storage } from '@/utils/storage';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [dashboardData, setDashboardData] = useState(storage.getDashboard());
  const [inventory, setInventory] = useState(storage.getInventory());
  const company = storage.getCurrentCompany();

  useEffect(() => {
    if (!storage.getCurrentUser()) {
      setLocation('/');
    }
  }, [setLocation]);

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
            value={dashboardData.kpis.sales}
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <KPICard
            label="Total Expenses"
            value={dashboardData.kpis.expenses}
            icon={Wallet}
            trend={{ value: 3.2, isPositive: false }}
          />
          <KPICard
            label="Profit/Loss"
            value={dashboardData.kpis.profit}
            icon={TrendingUp}
            trend={{ value: 8.1, isPositive: true }}
          />
        </div>

        <QuickActions
          onCreateInvoice={() => setLocation('/new-invoice')}
          onAddCustomer={() => console.log('Add Customer')}
          onRecordExpense={() => console.log('Record Expense')}
          onAddStock={() => console.log('Add Stock')}
        />

        <SalesChart data={dashboardData.trends} />

        <InventoryAlert items={inventory} />
      </main>

      <BottomNav />
    </div>
  );
}
