'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from './ProductCard';
import ProductFilters, { FilterState } from './ProductFilters';
import Breadcrumbs from './Breadcrumbs';
import EmptyState from './EmptyState';
import { Skeleton } from './ui/skeleton';
import { Product, Brand, Category } from '../types';

interface CategoryClientPageProps {
  category: Category;
  initialProducts: Product[];
  brands: Brand[];
  allCategories: Category[];
}

// Client-side filtering function
function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products];

  // Filter by subcategory
  if (filters.subcategory) {
    filtered = filtered.filter(product => 
      product.category === filters.subcategory
    );
  }

  // Filter by brand
  if (filters.brand) {
    filtered = filtered.filter(product => 
      product.brand.toLowerCase() === filters.brand?.toLowerCase()
    );
  }

  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.reference?.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by AR availability
  if (filters.hasAR) {
    filtered = filtered.filter(product => product.ar);
  }

  // Filter by downloads availability
  if (filters.hasDownloads) {
    filtered = filtered.filter(product => 
      product.downloads && product.downloads.length > 0
    );
  }

  // Sort products
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (filters.sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'brand':
          compareValue = a.brand.localeCompare(b.brand);
          break;
        case 'category':
          compareValue = a.category.localeCompare(b.category);
          break;
        case 'newest':
          compareValue = (b.id || 0) - (a.id || 0);
          break;
        default:
          compareValue = 0;
      }
      
      return filters.sortOrder === 'desc' ? -compareValue : compareValue;
    });
  }

  return filtered;
}

export default function CategoryClientPage({ 
  category, 
  initialProducts, 
  brands,
  allCategories 
}: CategoryClientPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: category.slug,
    subcategory: searchParams.get('subcategory') || null,
    brand: searchParams.get('brand') || null,
    hasAR: searchParams.get('ar') === 'true',
    hasDownloads: searchParams.get('docs') === 'true',
    sortBy: (searchParams.get('sort') as FilterState['sortBy']) || 'name',
    sortOrder: (searchParams.get('order') as FilterState['sortOrder']) || 'asc'
  });

  // Filter products based on current filters
  const products = useMemo(() => {
    return filterProducts(initialProducts, filters);
  }, [initialProducts, filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.hasAR) params.set('ar', 'true');
    if (filters.hasDownloads) params.set('docs', 'true');
    if (filters.sortBy !== 'name') params.set('sort', filters.sortBy);
    if (filters.sortOrder !== 'asc') params.set('order', filters.sortOrder);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  }, [filters, pathname, router]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setIsLoading(true);
    setFilters(newFilters);
    // Simulate a small delay for better UX
    setTimeout(() => setIsLoading(false), 150);
  };

  // Get subcategories available in current category
  const availableSubcategories = useMemo(() => {
    const subcats = new Set<string>();
    initialProducts.forEach(product => {
      if (product.category) {
        subcats.add(product.category);
      }
    });
    return Array.from(subcats).sort();
  }, [initialProducts]);

  // Update category subcategories for filtering
  const categoryWithSubcategories = {
    ...category,
    subcategories: availableSubcategories.map(subcat => ({
      name: subcat,
      slug: subcat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }))
  };

  const breadcrumbItems = [
    { label: 'Produits', href: '/produits' },
    ...(filters.brand ? [{ label: 'Marques', href: '/marques' }] : []),
    ...(filters.brand ? [{ label: filters.brand, href: `/marques/${brands.find(b => b.name === filters.brand)?.slug || ''}` }] : []),
    { label: category.name }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        categories={[categoryWithSubcategories]}
        brands={brands}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalResults={products.length}
        isLoading={isLoading}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {filters.brand ? `${category.name} ${filters.brand}` : category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-gray-600 mt-2">
                  {filters.brand ? 
                    `Découvrez tous les produits ${category.name.toLowerCase()} de la marque ${filters.brand}` :
                    category.description
                  }
                </p>
              )}
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-hava-primary">
                {isLoading ? '...' : products.length}
              </div>
              <div className="text-sm text-gray-600">
                produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const brand = brands.find(b => b.slug.toLowerCase() === product.brand.toLowerCase());
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  brandName={brand?.name}
                  showBrand={true}
                  showCategory={filters.subcategory === null}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Aucun produit trouvé"
            description={
              Object.values(filters).some(v => v && v !== 'name' && v !== 'asc')
                ? "Aucun produit ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres."
                : `Aucun produit n'est actuellement disponible dans la catégorie ${category.name}.`
            }
          />
        )}

        {/* Category Info */}
        {!isLoading && products.length > 0 && availableSubcategories.length > 1 && (
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sous-catégories disponibles
            </h2>
            <div className="flex flex-wrap gap-2">
              {availableSubcategories.map((subcat) => {
                const count = initialProducts.filter(p => p.category === subcat).length;
                return (
                  <button
                    key={subcat}
                    onClick={() => setFilters((prev: FilterState) => ({ 
                      ...prev, 
                      subcategory: prev.subcategory === subcat ? null : subcat 
                    }))}
                    className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                      filters.subcategory === subcat
                        ? 'bg-hava-primary text-white border-hava-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-hava-primary hover:text-hava-primary'
                    }`}
                  >
                    {subcat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
