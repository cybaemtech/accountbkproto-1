import SalesChart from '../SalesChart';

export default function SalesChartExample() {
  const mockData = [
    { month: 'Jul', sales: 45000, expenses: 20000 },
    { month: 'Aug', sales: 52000, expenses: 18000 },
    { month: 'Sep', sales: 48000, expenses: 22000 },
    { month: 'Oct', sales: 65000, expenses: 25000 },
    { month: 'Nov', sales: 58000, expenses: 21000 },
  ];

  return (
    <div className="bg-background p-6">
      <SalesChart data={mockData} />
    </div>
  );
}
