import Link from 'next/link';
import Image from 'next/image';
import { Download, Smartphone, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  brandName?: string;
  showBrand?: boolean;
  showCategory?: boolean;
}

export default function ProductCard({ 
  product, 
  brandName, 
  showBrand = true, 
  showCategory = false 
}: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
            <span className="text-sm">Image produit</span>
          </div>
          
          {/* AR Badge */}
          {product.ar && (
            <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
              <Smartphone className="w-3 h-3 mr-1" />
              AR
            </Badge>
          )}
          
          {/* Brand Badge */}
          {showBrand && brandName && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 bg-white/90 text-gray-700"
            >
              {brandName.toUpperCase()}
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          {/* Product Info */}
          <div>
            <h3 className="font-semibold text-lg group-hover:text-hava-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            {product.reference && (
              <p className="text-sm text-gray-500 mt-1">Réf. {product.reference}</p>
            )}
          </div>

          {showCategory && (
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          )}

          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex space-x-2">
            <Link 
              href={`/produit/${product.slug}`}
              className="flex-1 bg-hava-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-hava-primary-dark transition-colors text-center"
            >
              Voir détails
            </Link>
            
            {product.downloads && product.downloads.length > 0 && (
              <Link
                href={product.downloads[0].url}
                target="_blank"
                className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors inline-flex items-center"
                title="Télécharger la documentation"
              >
                <Download className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}