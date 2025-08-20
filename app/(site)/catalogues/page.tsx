import { getCatalogs, getBrands } from '../../../lib/data';
import PdfLink from '../../../components/PdfLink';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { FileText, Download } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogues',
  description: 'Téléchargez nos catalogues produits - Documentation technique complète pour professionnels',
};

export default async function CatalogsPage() {
  const [catalogs, brands] = await Promise.all([
    getCatalogs(),
    getBrands(),
  ]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catalogues & Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Téléchargez nos catalogues produits et découvrez l'ensemble de notre gamme. 
            Documentation technique complète pour vos projets professionnels.
          </p>
        </div>

        {/* Consolidated Catalog */}
        {catalogs.consolidated && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-hava-primary p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Catalogue principal HAVA</CardTitle>
                  <p className="text-gray-600">Découvrez l'ensemble de notre gamme en un seul document</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <p className="text-gray-700 mb-2">
                    Catalogue complet avec toutes nos marques et gammes de produits
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>• Format PDF</span>
                    <span>• Fiches techniques détaillées</span>
                    <span>• Références complètes</span>
                  </div>
                </div>
                <PdfLink 
                  download={catalogs.consolidated} 
                  className="bg-hava-primary hover:bg-hava-primary-dark"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Brand Catalogs */}
        {catalogs.brands && catalogs.brands.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Catalogues par marque</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogs.brands.map((brandCatalog) => {
                const brand = brands.find(b => b.slug === brandCatalog.brand);
                
                return (
                  <Card key={brandCatalog.brand} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            {brand?.name || brandCatalog.brand.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {brand?.name || brandCatalog.brand.toUpperCase()}
                          </CardTitle>
                          <p className="text-sm text-gray-500">Catalogue spécialisé</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {brand?.description && (
                          <p className="text-sm text-gray-600">{brand.description}</p>
                        )}
                        <PdfLink 
                          download={{
                            label: brandCatalog.label,
                            url: brandCatalog.url
                          }}
                          className="w-full justify-center"
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2 text-hava-primary" />
                Format et contenu
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Documents PDF haute définition</li>
                <li>• Fiches techniques détaillées</li>
                <li>• Références et codes produits</li>
                <li>• Dimensions et spécifications</li>
                <li>• Instructions de pose disponibles</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Mise à jour régulière
              </h3>
              <p className="text-gray-600 mb-4">
                Nos catalogues sont régulièrement mis à jour avec les dernières références 
                et nouveautés de nos marques partenaires.
              </p>
              <p className="text-gray-600">
                Pour être informé des dernières mises à jour, 
                <a href="mailto:contact@havagroupe.com" className="text-hava-primary hover:underline ml-1">
                  contactez notre équipe
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}