import { getPages } from '../../../lib/data';
import { Card, CardContent } from '../../../components/ui/card';
import { Building, Users, Award, Globe } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez HAVA Groupe - Distributeur B2B de solutions de quincaillerie et serrurerie au Maroc',
};

export default async function AboutPage() {
  const pages = await getPages();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{pages.about.title}</h1>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {pages.about.content}
          </div>
        </div>

        {/* Key Numbers/Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-hava-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">22</div>
              <div className="text-sm text-gray-600">Marques partenaires</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-hava-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">B2B</div>
              <div className="text-sm text-gray-600">Exclusivement professionnels</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-hava-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">Premium</div>
              <div className="text-sm text-gray-600">Marques européennes</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-hava-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">Maroc</div>
              <div className="text-sm text-gray-600">& Afrique du Nord</div>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Notre mission</h3>
              <p className="text-gray-700">
                Fournir aux professionnels du bâtiment les meilleures solutions de quincaillerie 
                et serrurerie européennes, avec un accompagnement technique de qualité et 
                un service de proximité adapté au marché marocain et nord-africain.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nos valeurs</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Qualité :</strong> Produits certifiés et conformes</li>
                <li>• <strong>Expertise :</strong> Support technique spécialisé</li>
                <li>• <strong>Partenariat :</strong> Relations durables avec nos clients</li>
                <li>• <strong>Innovation :</strong> Veille technologique constante</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-hava-primary text-white rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Travaillons ensemble</h3>
          <p className="text-xl mb-6 text-white/90">
            Vous êtes un professionnel ? Découvrez comment HAVA Groupe peut vous accompagner.
          </p>
          <a 
            href="mailto:contact@havagroupe.com"
            className="bg-white text-hava-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}