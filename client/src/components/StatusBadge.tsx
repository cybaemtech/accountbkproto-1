import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'Paid' | 'Pending' | 'Overdue';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    Paid: 'bg-green-500/10 text-green-400 border-green-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <Badge 
      variant="outline" 
      className={`${variants[status]} font-medium`}
      data-testid={`badge-${status.toLowerCase()}`}
    >
      {status}
    </Badge>
  );
}
