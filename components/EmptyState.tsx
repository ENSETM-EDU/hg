import { Package, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'package' | 'alert';
}

export default function EmptyState({ 
  title, 
  description, 
  icon = 'package' 
}: EmptyStateProps) {
  const Icon = icon === 'package' ? Package : AlertCircle;
  
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
    </div>
  );
}