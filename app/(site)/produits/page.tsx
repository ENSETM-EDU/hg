import { getCategories, getProductCountByCategory } from '../../../lib/data';
import CategoryCard from '../../../components/CategoryCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produits',
  description: 'Explorez notre gamme complète de produits professionnels - Quincaillerie, serrurerie et automatismes',
};

export default async function ProductsPage() {
  const [categories, productCounts] = await Promise.all([
    getCategories(),
    getProductCountByCategory(),
  ]);

  const totalProducts = Object.values(productCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos produits</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de <strong>{totalProducts} produits</strong> répartis 
            en {categories.length} catégories pour répondre à tous vos besoins professionnels.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              productCount={productCounts[category.slug] || 0}
            />
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Solutions professionnelles B2B
              </h2>
              <p className="text-gray-600 mb-4">
                HAVA Groupe s'adresse exclusivement aux professionnels : installateurs, 
                entreprises de BTP, architectes, bureaux d'études et distributeurs.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Produits certifiés et conformes aux normes européennes</li>
                <li>• Support technique spécialisé</li>
                <li>• Documentation complète (fiches techniques, guides d'installation)</li>
                <li>• Expérience en réalité augmentée pour certains produits</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Besoin d'aide ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe technique est à votre disposition pour vous conseiller 
                dans le choix des solutions les plus adaptées à vos projets.
              </p>
              <a 
                href="mailto:contact@havagroupe.com"
                className="bg-hava-primary text-white px-6 py-3 rounded-md font-medium hover:bg-hava-primary-dark transition-colors inline-block"
              >
                Contacter nos experts
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}