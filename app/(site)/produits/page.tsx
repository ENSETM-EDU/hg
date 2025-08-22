import { getCategories, getProductCountByCategory, getProductStats } from '../../../lib/data';
import CategoryCard from '../../../components/CategoryCard';
import { Metadata } from 'next';
import { BarChart3, Package, Building2, Download, Smartphone, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';

export const metadata: Metadata = {
  title: 'Produits',
  description: 'Explorez notre gamme complète de produits professionnels - Quincaillerie, serrurerie et automatismes',
};

export default async function ProductsPage() {
  const [categories, productCounts, stats] = await Promise.all([
    getCategories(),
    getProductCountByCategory(),
    getProductStats(),
  ]);

  const topCategories = stats.categoryDistribution.slice(0, 6);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos produits</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de <strong>{stats.totalProducts} produits</strong> de 
            <strong> {stats.totalBrands} marques</strong> répartis en {categories.length} catégories 
            pour répondre à tous vos besoins professionnels.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-hava-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
              <div className="text-sm text-gray-600">Produits</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-hava-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalBrands}</div>
              <div className="text-sm text-gray-600">Marques</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Smartphone className="w-8 h-8 text-hava-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.productsWithAR}</div>
              <div className="text-sm text-gray-600">Avec AR</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="w-8 h-8 text-hava-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.productsWithDownloads}</div>
              <div className="text-sm text-gray-600">Avec docs</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Catégories principales</h2>
            <div className="flex items-center text-sm text-gray-600">
              <BarChart3 className="w-4 h-4 mr-1" />
              Triées par nombre de produits
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                productCount={productCounts[category.slug] || 0}
                showSubcategories={true}
              />
            ))}
          </div>
        </div>

        {/* Top Categories by Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Catégories les plus populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCategories.map((item, index) => {
              const category = categories.find(c => c.slug === item.category);
              if (!category) return null;
              
              return (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  productCount={item.count}
                  variant="compact"
                />
              );
            })}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-hava-primary" />
                Solutions professionnelles B2B
              </h2>
              <p className="text-gray-600 mb-4">
                HAVA Groupe s'adresse exclusivement aux professionnels : installateurs, 
                entreprises de BTP, architectes, bureaux d'études et distributeurs.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hava-primary rounded-full mr-3"></div>
                  Quincaillerie et serrurerie de qualité européenne
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hava-primary rounded-full mr-3"></div>
                  Solutions d'automatismes et contrôle d'accès
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-hava-primary rounded-full mr-3"></div>
                  Aménagement intérieur haut de gamme
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-hava-primary" />
                Pourquoi choisir HAVA Groupe ?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <strong className="text-gray-900">Catalogue exhaustif</strong>
                    <br />Plus de {stats.totalProducts} références disponibles
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <strong className="text-gray-900">Marques de confiance</strong>
                    <br />Partenariats avec {stats.totalBrands} fabricants européens reconnus
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <strong className="text-gray-900">Innovation technologique</strong>
                    <br />{stats.productsWithAR} produits avec visualisation AR
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}