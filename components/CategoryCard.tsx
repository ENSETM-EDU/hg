import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { Category } from '../types';
import { Card, CardContent } from './ui/card';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link href={`/produits/${category.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-hava-primary/10 rounded-full flex items-center justify-center group-hover:bg-hava-primary transition-colors">
              {category.icon ? (
                <div className="w-8 h-8 text-hava-primary group-hover:text-white transition-colors">
                  <Image 
                    src={category.icon} 
                    alt={category.name}
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <Package className="w-8 h-8 text-hava-primary group-hover:text-white" />
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-lg group-hover:text-hava-primary transition-colors">
                {category.name}
              </h3>
              {productCount !== undefined && (
                <p className="text-gray-600 text-sm mt-1">
                  {productCount} produit{productCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}