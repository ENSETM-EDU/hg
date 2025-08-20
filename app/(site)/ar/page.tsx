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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Réalité Augmentée</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de produits compatibles avec la réalité augmentée. 
            Visualisez-les directement dans votre environnement avant installation.
          </p>
        </div>

        {/* AR Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Avantages de la réalité augmentée</h2>
              <p className="text-xl text-gray-600">
                Une expérience immersive pour visualiser et choisir vos produits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Eye className="w-8 h-8 text-hava-primary mb-2" />
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
                  <Zap className="w-8 h-8 text-hava-primary mb-2" />
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
                  <Smartphone className="w-8 h-8 text-hava-primary mb-2" />
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
          </div>
        </section>

        {/* AR Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {arProducts.length > 0 ? (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Produits avec expérience AR
                  </h2>
                  <p className="text-xl text-gray-600">
                    {arProducts.length} produit{arProducts.length > 1 ? 's' : ''} disponible{arProducts.length > 1 ? 's' : ''} en réalité augmentée
                  </p>
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
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comment utiliser la réalité augmentée ?
              </h2>
              <p className="text-xl text-gray-600">
                Suivez ces étapes simples pour visualiser nos produits en 3D
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              <div>
                <div className="bg-hava-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Sélectionnez un produit</h4>
                <p className="text-gray-600">
                  Choisissez un produit avec le badge AR dans la liste ci-dessus
                </p>
              </div>
              
              <div>
                <div className="bg-hava-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Accédez à la fiche produit</h4>
                <p className="text-gray-600">
                  Cliquez sur "Voir en AR" depuis la page de détail du produit
                </p>
              </div>
              
              <div>
                <div className="bg-hava-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Visualisez en 3D</h4>
                <p className="text-gray-600">
                  Utilisez votre appareil pour placer et visualiser le produit
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Besoin d'aide avec la réalité augmentée ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe technique peut vous accompagner dans l'utilisation de cette technologie 
                pour vos présentations clients.
              </p>
              <a 
                href="mailto:contact@havagroupe.com"
                className="bg-hava-primary text-white px-6 py-3 rounded-md font-medium hover:bg-hava-primary-dark transition-colors"
              >
                Contacter nos experts
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}