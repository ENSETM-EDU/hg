import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProduct, getBrand, getProducts, getBrands } from '../../../../lib/data';
import type { Brand } from '../../../../types';
import SpecsList from '../../../../components/SpecsList';
import ProductAttributes from '../../../../components/ProductAttributes';
import PdfLink from '../../../../components/PdfLink';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Smartphone, ExternalLink, Package } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return {
      title: 'Produit non trouvé',
    };
  }

  // Get brand by finding the brand with matching name
  const brands = await getBrands();
  const brand = brands.find((b: Brand) => b.name === product.brand) || null;

  return {
    title: `${product.name} - ${brand?.name || 'HAVA'}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Get brand by finding the brand with matching name
  const brands = await getBrands();
  const brand = brands.find((b: Brand) => b.name === product.brand) || null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-hava-primary">Accueil</Link>
          <span>/</span>
          <Link href="/produits" className="hover:text-hava-primary">Produits</Link>
          <span>/</span>
          <Link href={`/produits/${product.category}`} className="hover:text-hava-primary capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Package className="w-16 h-16 mx-auto mb-4" />
                <p>Image du produit</p>
              </div>
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-xs text-gray-400">Img {index + 2}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand Badge */}
            {brand && (
              <div>
                <Link 
                  href={`/marques/${brand.slug}`}
                  className="inline-flex items-center space-x-2 hover:underline"
                >
                  <Badge variant="secondary" className="text-sm">
                    {brand.name}
                  </Badge>
                </Link>
              </div>
            )}

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {product.reference && (
                <p className="text-lg text-gray-600">Référence : {product.reference}</p>
              )}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {product.downloads && product.downloads.map((download, index) => (
                <PdfLink key={index} download={download} />
              ))}
              
              {product.ar && (
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Voir en AR
                </Button>
              )}

              {brand?.website && (
                <Button variant="outline" asChild>
                  <a href={brand.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Site {brand.name}
                  </a>
                </Button>
              )}
            </div>

            {/* Category Link */}
            <div className="pt-6 border-t">
              <Link 
                href={`/produits/${product.category}`}
                className="text-hava-primary hover:underline font-medium"
              >
                Voir tous les produits de la catégorie {product.category}
              </Link>
            </div>
          </div>
        </div>

        {/* Attributes */}
        {(product.attributes && Object.keys(product.attributes).length > 0) && (
          <div className="mb-12">
            <ProductAttributes attributes={product.attributes} />
          </div>
        )}

        {/* Specifications */}
        {(product.specs && Object.keys(product.specs).length > 0) && (
          <div className="mb-12">
            <SpecsList specs={product.specs} title="Spécifications techniques" />
          </div>
        )}

        {/* Contact CTA */}
        <Card>
          <CardHeader>
            <CardTitle>Besoin d'informations complémentaires ?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Notre équipe technique est à votre disposition pour vous conseiller 
              et vous accompagner dans vos projets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="mailto:contact@havagroupe.com">
                  Contactez nos experts
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/catalogues">
                  Télécharger les catalogues
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}