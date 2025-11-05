import { useState } from 'react';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { storage } from '@/utils/storage';
import { formatCurrency } from '@/utils/formatters';
import { Package, AlertCircle } from 'lucide-react';

export default function Inventory() {
  const [inventory] = useState(storage.getInventory());

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-card border-b border-card-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Inventory</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map(item => {
            const isLowStock = item.qty < item.threshold;
            
            return (
              <Card key={item.id} className="p-6" data-testid={`inventory-item-${item.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)} per unit
                      </p>
                    </div>
                  </div>
                  {isLowStock && (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Stock:</span>
                    <span className={`font-semibold ${isLowStock ? 'text-amber-500' : 'text-foreground'}`}>
                      {item.qty} units
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Threshold:</span>
                    <span className="font-medium text-foreground">{item.threshold} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-semibold font-mono text-foreground">
                      {formatCurrency(item.qty * item.price)}
                    </span>
                  </div>
                </div>

                {isLowStock && (
                  <div className="mt-4 px-3 py-2 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium text-center">
                    Low Stock - Reorder Soon
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
