import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ReactElement } from 'react';

interface ProductAttributesProps {
  attributes: Record<string, any>;
  title?: string;
}

export default function ProductAttributes({ attributes, title = "Caractéristiques" }: ProductAttributesProps) {
  if (!attributes || Object.keys(attributes).length === 0) {
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
      'sécurité': 'Sécurité',
      'charge_max': 'Charge maximale',
      'type': 'Type',
      'force': 'Force',
      'poids_porte_max': 'Poids porte max.',
      'angle_ouverture': 'Angle d\'ouverture',
      'couleur': 'Couleur',
      'taille': 'Taille',
      'grade': 'Grade',
      'norme': 'Norme',
      'resistance': 'Résistance',
      'epaisseur': 'Épaisseur'
    };
    
    return keyMap[key.toLowerCase()] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  // Function to format attribute values
  const formatValue = (value: any): ReactElement => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? 'Oui' : 'Non'}
        </Badge>
      );
    }
    
    if (typeof value === 'string') {
      // If the value contains multiple options separated by " / ", display them as badges
      if (value.includes(' / ')) {
        const options = value.split(' / ');
        return (
          <div className="flex flex-wrap gap-1">
            {options.map((option, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {option.trim()}
              </Badge>
            ))}
          </div>
        );
      }
      
      // For single values
      return <span className="text-gray-900 font-semibold">{value}</span>;
    }
    
    return <span className="text-gray-900 font-semibold">{String(value)}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(attributes).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <dt className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {formatKey(key)}
              </dt>
              <dd className="text-sm">
                {formatValue(value)}
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
