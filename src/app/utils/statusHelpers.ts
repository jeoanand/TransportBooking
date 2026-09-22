import { TBStatus } from '../data/mockData';

export function getStatusColor(status: TBStatus): string {
  switch (status) {
    case 'AVAILABLE':
      return 'bg-green-100 text-green-800';
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800';
    case 'COMPLETED':
      return 'bg-emerald-100 text-emerald-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'ON_HOLD':
      return 'bg-orange-100 text-orange-800';
    case 'REJECTED':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

export function getStatusIcon(status: TBStatus): string {
  switch (status) {
    case 'AVAILABLE':
      return '✓';
    case 'IN_PROGRESS':
      return '⟳';
    case 'COMPLETED':
      return '✓✓';
    case 'PENDING':
      return '⏱';
    case 'CANCELLED':
      return '✕';
    case 'ON_HOLD':
      return '⏸';
    case 'REJECTED':
      return '⚠';
    default:
      return '';
  }
}
