import { getHome, getBrands, getProducts, getCategories, getProduct, getCategory } from '../../lib/data';
import { Brand, Product, Category } from '../../types';
import HeroCarousel from '../../components/HeroCarousel';
import BrandCard from '../../components/BrandCard';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';

interface HeroItem {
  type: 'product' | 'brand' | 'category';
  slug: string;
  title: string;
  description: string;
  href: string;
  logo?: string;
  images?: string[];
}

export default async function HomePage() {
  const [home, brands, products, categories] = await Promise.all([
    getHome(),
    getBrands(),
    getProducts(),
    getCategories(),
  ]);

  // Build hero items from all brands
  const heroItems: HeroItem[] = brands.map((brand) => ({
    type: 'brand',
    slug: brand.slug,
    title: brand.name,
    description: brand.description || 'Découvrez nos solutions professionnelles',
    href: `/marques/${brand.slug}`,
    logo: brand.logo
  }));

  // Get featured data
  const featuredBrands = home.featuredBrands 
    ? brands.filter(brand => home.featuredBrands!.includes(brand.slug)).slice(0, 6)
    : brands.slice(0, 6);

  const featuredCategories = home.featuredCategories
    ? categories.filter(category => home.featuredCategories!.includes(category.slug)).slice(0, 6)
    : categories.slice(0, 6);

  const recentProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel items={heroItems} />

      {/* Featured Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos marques partenaires</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous distribuons les meilleures marques européennes de quincaillerie et serrurerie
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/marques" 
              className="inline-flex items-center space-x-2 bg-hava-primary text-white px-6 py-3 rounded-md font-medium hover:bg-hava-primary-dark transition-colors"
            >
              <span>Voir toutes les marques</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Catégories de produits</h2>
            <p className="text-xl text-gray-600">
              Explorez notre gamme complète de solutions professionnelles
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredCategories.map((category) => (
              <CategoryCard 
                key={category.slug} 
                category={category}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/produits" 
              className="inline-flex items-center space-x-2 border border-hava-primary text-hava-primary px-6 py-3 rounded-md font-medium hover:bg-hava-primary hover:text-white transition-colors"
            >
              <span>Voir tous les produits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produits récents</h2>
            <p className="text-xl text-gray-600">
              Découvrez les dernières solutions ajoutées à notre catalogue
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((product) => {
              const brand = brands.find(b => b.slug === product.brand);
              return (
                <ProductCard 
                  key={product.slug} 
                  product={product} 
                  brandName={brand?.name}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      {home.news && home.news.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualités</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {home.news.map((news, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Newspaper className="w-5 h-5 text-hava-primary" />
                      <span className="text-sm text-gray-500">
                        {new Date(news.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      <Link href={news.href} className="hover:text-hava-primary transition-colors">
                        {news.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}