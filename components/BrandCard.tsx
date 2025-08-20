import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Brand } from '../types';
import { Card, CardContent } from './ui/card';

interface BrandCardProps {
  brand: Brand;
  showDescription?: boolean;
}

export default function BrandCard({ brand, showDescription = false }: BrandCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-full h-32 flex items-center justify-center bg-gray-50 rounded-lg p-6">
            <div className="relative w-full h-full">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                  {brand.name}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg group-hover:text-hava-primary transition-colors">
              {brand.name}
            </h3>
            {showDescription && brand.description && (
              <p className="text-gray-600 text-sm">{brand.description}</p>
            )}
          </div>

          <div className="flex space-x-2">
            <Link 
              href={`/marques/${brand.slug}`}
              className="bg-hava-primary text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-hava-primary-dark transition-colors"
            >
              Voir les produits
            </Link>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors inline-flex items-center space-x-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Site web</span>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}