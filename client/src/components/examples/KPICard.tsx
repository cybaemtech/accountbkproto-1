import KPICard from '../KPICard';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

export default function KPICardExample() {
  return (
    <div className="bg-background p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          label="Total Sales" 
          value={124500} 
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard 
          label="Total Expenses" 
          value={54320} 
          icon={Wallet}
          trend={{ value: 3.2, isPositive: false }}
        />
        <KPICard 
          label="Profit/Loss" 
          value={70180} 
          icon={TrendingUp}
          trend={{ value: 8.1, isPositive: true }}
        />
      </div>
    </div>
  );
}
