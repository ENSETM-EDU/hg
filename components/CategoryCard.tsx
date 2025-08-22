'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight } from 'lucide-react';
import { Category } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  showSubcategories?: boolean;
  variant?: 'default' | 'compact';
}

export default function CategoryCard({ 
  category, 
  productCount, 
  showSubcategories = false,
  variant = 'default'
}: CategoryCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/produits/${category.slug}`}>
        <Card className="group hover:shadow-md transition-all duration-200 hover:border-hava-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-hava-primary/10 rounded-lg flex items-center justify-center group-hover:bg-hava-primary transition-colors overflow-hidden">
                {category.icon ? (
                  <Image 
                    src={category.icon} 
                    alt={category.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <Package className="w-8 h-8 text-hava-primary group-hover:text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-hava-primary transition-colors">
                  {category.name}
                </h3>
                {productCount !== undefined && (
                  <p className="text-sm text-gray-500">
                    {productCount} produit{productCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-hava-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
      <CardContent className="p-6 h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <Link href={`/produits/${category.slug}`} className="flex-1">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-hava-primary/10 rounded-full flex items-center justify-center group-hover:bg-hava-primary transition-colors overflow-hidden">
                {category.icon ? (
                  <Image 
                    src={category.icon} 
                    alt={category.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                ) : (
                  <Package className="w-12 h-12 text-hava-primary group-hover:text-white" />
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-lg group-hover:text-hava-primary transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {category.description}
                  </p>
                )}
                {productCount !== undefined && (
                  <p className="text-gray-600 text-sm mt-2">
                    {productCount} produit{productCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </Link>

          {/* Subcategories */}
          {showSubcategories && category.subcategories && category.subcategories.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2">Sous-catégories populaires:</p>
              <div className="flex flex-wrap gap-1">
                {category.subcategories.slice(0, 3).map((sub) => (
                  <Badge 
                    key={sub.slug} 
                    variant="outline" 
                    className="text-xs hover:bg-hava-primary hover:text-white hover:border-hava-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      // You can add navigation to subcategory here
                    }}
                  >
                    {sub.name}
                  </Badge>
                ))}
                {category.subcategories.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{category.subcategories.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}