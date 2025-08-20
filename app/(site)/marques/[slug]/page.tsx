import { notFound } from 'next/navigation';
import { getBrand, getProductsByBrand, getCategoriesForBrand, getBrands } from '../../../../lib/data';
import ProductCard from '../../../../components/ProductCard';
import EmptyState from '../../../../components/EmptyState';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

interface BrandPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const brand = await getBrand(params.slug);
  
  if (!brand) {
    return {
      title: 'Marque non trouvée',
    };
  }

  return {
    title: `${brand.name}`,
    description: `Découvrez tous les produits ${brand.name} disponibles chez HAVA Groupe - ${brand.description || 'Solutions professionnelles'}`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const [brand, products, categories] = await Promise.all([
    getBrand(params.slug),
    getProductsByBrand(params.slug),
    getCategoriesForBrand(params.slug),
  ]);

  if (!brand) {
    notFound();
  }

  // Group products by category
  const productsByCategory = categories.map(category => ({
    category,
    products: products.filter(product => product.category === category.slug)
  }));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Brand Logo */}
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center p-4">
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500">
                {brand.name}
              </div>
            </div>
            
            {/* Brand Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{brand.name}</h1>
              {brand.description && (
                <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                  {brand.description}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="text-gray-600">
                  <strong>{products.length}</strong> produits disponibles
                  {categories.length > 0 && (
                    <span> dans <strong>{categories.length}</strong> catégories</span>
                  )}
                </div>
                
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-hava-primary hover:underline"
                  >
                    <span>Site officiel</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products by Category */}
        {productsByCategory.length > 0 ? (
          <div className="space-y-12">
            {productsByCategory.map(({ category, products }) => (
              <section key={category.slug}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {category.name}
                  </h2>
                  <Link 
                    href={`/produits/${category.slug}`}
                    className="text-hava-primary hover:underline text-sm font-medium"
                  >
                    Voir tous les {category.name.toLowerCase()}
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      brandName={brand.name}
                      showBrand={false}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun produit disponible"
            description={`Aucun produit ${brand.name} n'est actuellement disponible dans notre catalogue.`}
          />
        )}
      </div>
    </div>
  );
}