import { getPages } from '../../../lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez HAVA Groupe - Nous sommes à votre disposition pour tous vos projets professionnels',
};

export default async function ContactPage() {
  const pages = await getPages();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nous contacter</h1>
          <p className="text-xl text-gray-600">
            Notre équipe est à votre disposition pour vous accompagner dans vos projets
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-hava-primary" />
                <span>Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href={`mailto:${pages.contact.email}`}
                className="text-hava-primary hover:underline text-lg font-medium"
              >
                {pages.contact.email}
              </a>
              <p className="text-gray-600 mt-2">
                Pour toute demande d'information, devis ou support technique
              </p>
            </CardContent>
          </Card>

          {pages.contact.phone && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-hava-primary" />
                  <span>Téléphone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`tel:${pages.contact.phone}`}
                  className="text-hava-primary hover:underline text-lg font-medium"
                >
                  {pages.contact.phone}
                </a>
                <p className="text-gray-600 mt-2">
                  Lundi - Vendredi : 8h00 - 17h00
                </p>
              </CardContent>
            </Card>
          )}

          {pages.contact.address && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-hava-primary" />
                  <span>Adresse</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-900 mb-2">{pages.contact.address}</p>
                <p className="text-gray-600">
                  Showroom et entrepôt
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        
        {/* What we help with */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Comment pouvons-nous vous aider ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-hava-primary p-3 rounded-full inline-block mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Conseil technique</h3>
                <p className="text-gray-600">
                  Aide au choix des produits, compatibilités, normes et certifications
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-hava-primary p-3 rounded-full inline-block mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Support projet</h3>
                <p className="text-gray-600">
                  Étude de vos besoins, préconisations et accompagnement personnalisé
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-hava-primary p-3 rounded-full inline-block mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Formation produits</h3>
                <p className="text-gray-600">
                  Sessions techniques sur nos gammes et nouveautés pour vos équipes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}