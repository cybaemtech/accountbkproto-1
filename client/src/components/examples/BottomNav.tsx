import BottomNav from '../BottomNav';

export default function BottomNavExample() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-background p-6">
        <p className="text-foreground">Content area (scroll to see bottom nav)</p>
      </div>
      <BottomNav />
    </div>
  );
}
