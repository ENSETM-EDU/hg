import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { getSettings } from '../lib/data';
import Header from '../components/Header';
import Footer from '../components/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  
  return {
    title: {
      template: `%s | ${settings.siteName}`,
      default: `${settings.siteName} - Distributeur B2B Quincaillerie & Serrurerie`
    },
    description: 'Distributeur professionnel B2B de solutions de quincaillerie, serrurerie et automatismes. Marques européennes premium pour installateurs, architectes et entreprises.',
    keywords: ['quincaillerie', 'serrurerie', 'B2B', 'professionnel', 'distributeur', 'Maroc', 'automatismes'],
    authors: [{ name: 'Hava Groupe' }],
    icons: {
      icon: '/hava_logo2.png',
      shortcut: '/hava_logo2.png',
      apple: '/hava_logo2.png',
    },
    openGraph: {
      title: `${settings.siteName} - Distributeur B2B`,
      description: 'Solutions professionnelles de quincaillerie et serrurerie',
      type: 'website',
      locale: 'fr_FR',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="font-montserrat antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}