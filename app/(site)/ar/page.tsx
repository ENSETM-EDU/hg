import { getARProducts, getBrands } from '../../../lib/data';
import ProductCard from '../../../components/ProductCard';
import EmptyState from '../../../components/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Smartphone, Eye, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalité Augmentée',
  description: 'Découvrez nos produits en réalité augmentée - Visualisez les solutions HAVA directement dans votre environnement',
};

export default async function ARPage() {
  const [arProducts, brands] = await Promise.all([
    getARProducts(),
    getBrands(),
  ]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Smartphone className="w-5 h-5" />
            <span className="font-medium">Réalité Augmentée</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visualisez nos produits en 3D
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de produits compatibles avec la réalité augmentée. 
            Visualisez-les directement dans votre environnement avant installation.
          </p>
        </div>

        {/* AR Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Eye className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Visualisation 3D</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualisez les produits en taille réelle dans votre environnement 
                pour mieux appréhender les dimensions et l'intégration.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Aide à la décision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Facilitez vos choix et ceux de vos clients en présentant 
                les produits de manière immersive et interactive.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Smartphone className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Compatible mobile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Utilisez votre smartphone ou tablette pour accéder 
                à l'expérience AR directement sur site.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AR Products */}
        {arProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Produits avec expérience AR
              </h2>
              <div className="text-gray-600">
                {arProducts.length} produit{arProducts.length > 1 ? 's' : ''} disponible{arProducts.length > 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {arProducts.map((product) => {
                const brand = brands.find(b => b.slug === product.brand);
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
          </div>
        ) : (
          <EmptyState
            title="Aucun produit AR disponible"
            description="Nous travaillons à enrichir notre catalogue avec de nouveaux modèles 3D. Revenez bientôt !"
            icon="package"
          />
        )}

        {/* How it works */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Comment utiliser la réalité augmentée ?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Sélectionnez un produit</h4>
              <p className="text-gray-600">
                Choisissez un produit avec le badge AR dans la liste ci-dessus
              </p>
            </div>
            
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Accédez à la fiche produit</h4>
              <p className="text-gray-600">
                Cliquez sur "Voir en AR" depuis la page de détail du produit
              </p>
            </div>
            
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Visualisez en 3D</h4>
              <p className="text-gray-600">
                Utilisez votre appareil pour placer et visualiser le produit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}