import InventoryAlert from '../InventoryAlert';

export default function InventoryAlertExample() {
  const mockItems = [
    { id: 1, name: 'Product A', qty: 8, threshold: 10, price: 1200 },
    { id: 2, name: 'Product B', qty: 3, threshold: 5, price: 2500 },
  ];

  return (
    <div className="bg-background p-6">
      <InventoryAlert items={mockItems} />
    </div>
  );
}
