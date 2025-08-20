import { notFound } from 'next/navigation';
import { getCategory, getProductsByCategory, getBrands, getCategories } from '../../../../lib/data';
import ProductCard from '../../../../components/ProductCard';
import EmptyState from '../../../../components/EmptyState';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategory(categorySlug);
  
  if (!category) {
    return {
      title: 'Catégorie non trouvée',
    };
  }

  return {
    title: category.name,
    description: `Découvrez tous les produits ${category.name.toLowerCase()} disponibles chez HAVA Groupe - Solutions professionnelles B2B`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const [category, products, brands] = await Promise.all([
    getCategory(categorySlug),
    getProductsByCategory(categorySlug),
    getBrands(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600">
            {products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const brand = brands.find(b => b.slug === product.brand);
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  brandName={brand?.name}
                  showBrand={true}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Aucun produit disponible"
            description={`Aucun produit n'est actuellement disponible dans la catégorie ${category.name}.`}
          />
        )}
      </div>
    </div>
  );
}