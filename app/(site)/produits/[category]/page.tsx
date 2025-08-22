import { notFound } from 'next/navigation';
import { getCategory, getProductsByCategory, getBrands, getCategories } from '../../../../lib/data';
import CategoryPageWrapper from '../../../../components/CategoryPageWrapper';
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
    description: category.description || `Découvrez tous les produits ${category.name.toLowerCase()} disponibles chez HAVA Groupe - Solutions professionnelles B2B`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const [category, products, brands, allCategories] = await Promise.all([
    getCategory(categorySlug),
    getProductsByCategory(categorySlug),
    getBrands(),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <CategoryPageWrapper
      category={category}
      initialProducts={products}
      brands={brands}
      allCategories={allCategories}
    />
  );
}