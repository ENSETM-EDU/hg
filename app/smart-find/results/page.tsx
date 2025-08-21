'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { queryProducts, parseTags, parseSpecs, toTitle } from '@/lib/smartfind';
import { Product } from '@/types';
import EmptyState from '@/components/EmptyState';

function ResultsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = searchParams.get('category') || undefined;
  const tagsParam = searchParams.get('tags') || undefined;
  const specsParam = searchParams.get('specs') || undefined;
  
  const tags = parseTags(tagsParam);
  const specs = parseSpecs(specsParam);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        // Since we can't make server calls in static export, 
        // we'll need to load the products data differently
        // For now, let's use the sample products from the initial data
        const sampleProducts: Product[] = [
          {
            slug: "poignee-elite-1",
            name: "Poignée Elite Série 1",
            brand: "yale",
            category: "poignees",
            description: "Poignée haute sécurité pour porte d'entrée",
            reference: "ELT-001",
            images: ["/products/poignee-elite-1.jpg"],
            specs: {
              "finition": "Acier inoxydable",
              "garantie": "15 ans"
            },
            tags: ["porte", "interieur", "moderne", "securite"],
            ar: undefined
          },
          {
            slug: "serrure-multipoint-securite",
            name: "Serrure Multipoint Sécurité",
            brand: "yale",
            category: "serrures",
            description: "Serrure multipoint haute sécurité avec cylindre européen",
            reference: "MPS-2024",
            images: ["/products/serrure-multipoint.jpg"],
            specs: {
              "entraxe": "70 mm",
              "cylindre": "Européen",
              "points": "5 points"
            },
            tags: ["exterieur", "securite", "multipoint"],
            ar: {
              model: "/models/serrure-multipoint.usdz",
              type: "usdz"
            }
          },
          {
            slug: "cylindre-euro-pro",
            name: "Cylindre Européen Pro",
            brand: "yale",
            category: "cylindres",
            description: "Cylindre européen haute sécurité avec protection anti-casse",
            reference: "CEP-300",
            images: ["/products/cylindre-euro.jpg"],
            specs: {
              "dimension": "30x30mm",
              "cles": "5 clés",
              "protection": "Anti-casse"
            },
            tags: ["securite", "protection", "exterieur"],
            ar: undefined
          }
        ];
        
        // Filter products using the function
        const filteredProducts = queryProducts(sampleProducts, {
          category,
          tags: tags.length > 0 ? tags : undefined,
          specs: Object.keys(specs).length > 0 ? specs : undefined,
        });
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category, tagsParam, specsParam]);

  // Build filter description
  const filterParts: string[] = [];
  if (category) {
    filterParts.push(`Catégorie: ${toTitle(category)}`);
  }
  if (tags.length > 0) {
    filterParts.push(`Tags: ${tags.join(', ')}`);
  }
  if (Object.keys(specs).length > 0) {
    const specsDescription = Object.entries(specs)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    filterParts.push(`Spécifications: ${specsDescription}`);
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Résultats de recherche
          </h1>
          <Link
            href="/smart-find"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à Smart Find
          </Link>
        </div>
        
        {/* Filters applied */}
        {filterParts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h2 className="text-sm font-medium text-blue-900 mb-2">Filtres appliqués:</h2>
            <div className="flex flex-wrap gap-2">
              {filterParts.map((filter, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Results count */}
        <p className="text-gray-600">
          {products.length} produit{products.length !== 1 ? 's' : ''} trouvé{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Results */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.slug} className="group">
              <Link href={`/produit/${product.slug}`} className="block">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* AR Badge */}
                    {product.ar && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          AR disponible
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {product.name}
                    </h3>
                    
                    {product.reference && (
                      <p className="text-sm text-gray-500 mb-2">
                        Réf: {product.reference}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">
                        {toTitle(product.brand)}
                      </span>
                      
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="text-sm font-medium">Voir détails</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                            +{product.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <EmptyState
            title="Aucun produit trouvé"
            description="Aucun produit ne correspond aux critères sélectionnés. Essayez de modifier vos filtres ou explorez d'autres zones."
            icon="alert"
          />
          <div className="text-center mt-8">
            <Link
              href="/smart-find"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour à Smart Find
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
