import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Settings } from '../types';

interface FooterProps {
  settings: Settings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-hava-primary text-white font-bold text-xl px-3 py-1 rounded">
                HAVA
              </div>
              <span className="font-semibold text-xl">Groupe</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Distributeur B2B de solutions de quincaillerie, serrurerie et automatismes. 
              Partenaire de confiance des professionnels du bâtiment.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>contact@havagroupe.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+212 522 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/marques" className="hover:text-white transition-colors">Marques</Link></li>
              <li><Link href="/produits" className="hover:text-white transition-colors">Produits</Link></li>
              <li><Link href="/catalogues" className="hover:text-white transition-colors">Catalogues</Link></li>
              <li><Link href="/ar" className="hover:text-white transition-colors">Réalité Augmentée</Link></li>
              <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/produits/poignees" className="hover:text-white transition-colors">Poignées</Link></li>
              <li><Link href="/produits/serrures" className="hover:text-white transition-colors">Serrures</Link></li>
              <li><Link href="/produits/cylindres" className="hover:text-white transition-colors">Cylindres</Link></li>
              <li><Link href="/produits/coulissant" className="hover:text-white transition-colors">Systèmes coulissants</Link></li>
              <li><Link href="/produits/ferme-portes" className="hover:text-white transition-colors">Ferme-portes</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} {settings.siteName}. Tous droits réservés.
            </div>
            {settings.footerDisclaimer && (
              <div className="text-gray-400 text-sm mt-2 md:mt-0">
                {settings.footerDisclaimer}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}