import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SpecsListProps {
  specs?: Record<string, string | number | boolean>;
  attributes?: Record<string, any>;
  title?: string;
}

export default function SpecsList({ specs, attributes, title = "Spécifications techniques" }: SpecsListProps) {
  // Combine specs and attributes, prioritizing specs if both exist
  const data = specs || attributes || {};
  
  if (Object.keys(data).length === 0) {
    return null;
  }

  // Function to format attribute keys to be more readable
  const formatKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      'dimensions': 'Dimensions',
      'materiau': 'Matériau',
      'finition': 'Finition',
      'nbre_cles': 'Nombre de clés',
      'usage': 'Usage',
      'garantie': 'Garantie',
      'entraxe': 'Entraxe',
      'poids': 'Poids',
      'axe': 'Axe',
      'points_fermeture': 'Points de fermeture',
      'certification': 'Certification',
      'longueur': 'Longueur',
      'cles': 'Clés',
      'securite': 'Sécurité',
      'charge_max': 'Charge max',
      'type': 'Type',
      'force': 'Force',
      'poids_porte_max': 'Poids porte max',
      'angle_ouverture': 'Angle d\'ouverture'
    };
    
    return keyMap[key.toLowerCase()] || key;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <dt className="font-medium text-gray-700 flex-1">
                {formatKey(key)}
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