import { getBrands } from '../../../lib/data';
import BrandCard from '../../../components/BrandCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marques',
  description: 'Découvrez toutes nos marques partenaires - Solutions professionnelles de quincaillerie et serrurerie',
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos marques partenaires</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HAVA Groupe distribue {brands.length} marques européennes reconnues pour leur qualité 
            et leur innovation dans les domaines de la quincaillerie, serrurerie et automatismes.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <BrandCard 
              key={brand.slug} 
              brand={brand} 
              showDescription={true} 
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Vous ne trouvez pas votre marque ?
          </h2>
          <p className="text-gray-600 mb-6">
            Contactez-nous pour connaître l'ensemble de nos partenaires et solutions disponibles.
          </p>
          <a 
            href="mailto:contact@havagroupe.com"
            className="bg-hava-primary text-white px-6 py-3 rounded-md font-medium hover:bg-hava-primary-dark transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}