import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SpecsListProps {
  specs: Record<string, string | number | boolean>;
}

export default function SpecsList({ specs }: SpecsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Spécifications techniques</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <dt className="font-medium text-gray-700 flex-1">
                {key}
              </dt>
              <dd className="text-gray-900 font-semibold text-right flex-1">
                {typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : value}
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}