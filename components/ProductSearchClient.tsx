'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import ProductFilters, { FilterState } from './ProductFilters';
import Breadcrumbs from './Breadcrumbs';
import EmptyState from './EmptyState';
import { Skeleton } from './ui/skeleton';
import { Product, Brand, Category } from '../types';

interface ProductSearchClientProps {
  initialProducts: Product[];
  brands: Brand[];
  categories: Category[];
}

// Client-side filtering function
function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products];

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(product => 
      product.categoryHierarchy?.root === filters.category
    );
  }

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

export default function ProductSearchClient({ 
  initialProducts, 
  brands,
  categories 
}: ProductSearchClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || null,
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
    
    if (filters.search) params.set('q', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.hasAR) params.set('ar', 'true');
    if (filters.hasDownloads) params.set('docs', 'true');
    if (filters.sortBy !== 'name') params.set('sort', filters.sortBy);
    if (filters.sortOrder !== 'asc') params.set('order', filters.sortOrder);

    const newUrl = `/produits/recherche${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setIsLoading(true);
    setFilters(newFilters);
    // Simulate a small delay for better UX
    setTimeout(() => setIsLoading(false), 150);
  };

  const breadcrumbItems = [
    { label: 'Produits', href: '/produits' },
    { label: 'Recherche' }
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
        categories={categories}
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
                {filters.search ? `Recherche: "${filters.search}"` : 'Tous les produits'}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Explorez notre catalogue complet avec des filtres avancés
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-hava-primary">
                {isLoading ? '...' : products.length}
              </div>
              <div className="text-sm text-gray-600">
                résultat{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
                  showCategory={true}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Aucun produit trouvé"
            description={
              Object.values(filters).some(v => v && v !== 'name' && v !== 'asc')
                ? "Aucun produit ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres ou d'utiliser des mots-clés différents."
                : "Commencez votre recherche en utilisant la barre de recherche ou en sélectionnant des filtres."
            }
          />
        )}

        {/* Search Tips */}
        {!isLoading && products.length === 0 && filters.search && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Conseils pour améliorer votre recherche
            </h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Vérifiez l'orthographe de vos mots-clés</li>
              <li>• Essayez des termes plus généraux (ex: "serrure" au lieu de "serrure électrique")</li>
              <li>• Utilisez des synonymes ou des variantes</li>
              <li>• Recherchez par marque ou référence produit</li>
              <li>• Supprimez certains filtres pour élargir les résultats</li>
            </ul>
          </div>
        )}

        {/* Popular searches */}
        {!filters.search && !isLoading && (
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recherches populaires
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'serrure électrique',
                'cylindre haute sécurité',
                'ferme-porte',
                'poignée inox',
                'automatisme',
                'charnière invisible',
                'cadenas',
                'gâche électrique'
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setFilters((prev: FilterState) => ({ ...prev, search: term }))}
                  className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:border-hava-primary hover:text-hava-primary transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
