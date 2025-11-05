import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { InventoryItem } from '@/utils/storage';

interface InventoryAlertProps {
  items: InventoryItem[];
}

export default function InventoryAlert({ items }: InventoryAlertProps) {
  const lowStockItems = items.filter(item => item.qty < item.threshold);

  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-foreground">Low Stock Alert</h3>
      </div>
      <div className="space-y-3">
        {lowStockItems.map(item => (
          <div 
            key={item.id} 
            className="flex items-center justify-between py-2 border-b border-border last:border-0"
            data-testid={`inventory-alert-${item.id}`}
          >
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                Stock: {item.qty} (Threshold: {item.threshold})
              </p>
            </div>
            <div className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-medium">
              Low Stock
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
