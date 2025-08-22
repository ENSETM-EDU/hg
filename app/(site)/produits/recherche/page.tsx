import { Suspense } from 'react';
import { getProducts, getBrands, getCategories } from '../../../../lib/data';
import ProductSearchClient from '../../../../components/ProductSearchClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recherche de produits',
  description: 'Recherchez parmi notre gamme complète de produits avec des filtres avancés - HAVA Groupe',
};

function SearchContent({ products, brands, categories }: {
  products: any[];
  brands: any[];
  categories: any[];
}) {
  return (
    <ProductSearchClient
      initialProducts={products}
      brands={brands}
      categories={categories}
    />
  );
}

export default async function ProductSearchPage() {
  const [products, brands, categories] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Chargement de la recherche...</div>}>
      <SearchContent
        products={products}
        brands={brands}
        categories={categories}
      />
    </Suspense>
  );
}
