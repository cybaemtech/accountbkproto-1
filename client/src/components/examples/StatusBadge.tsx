import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="bg-background p-6 flex gap-4 items-center">
      <StatusBadge status="Paid" />
      <StatusBadge status="Pending" />
      <StatusBadge status="Overdue" />
    </div>
  );
}
