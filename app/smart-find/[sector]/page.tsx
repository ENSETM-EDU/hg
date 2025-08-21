import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSmartFind } from '@/lib/data';
import { toTitle } from '@/lib/smartfind';

interface SectorPageProps {
  params: Promise<{ sector: string }>;
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { sector: sectorSlug } = await params;
  const smartFindConfig = await getSmartFind();
  
  const sector = smartFindConfig.sectors.find(s => s.slug === sectorSlug);
  
  if (!sector) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/smart-find" className="hover:text-blue-600 transition-colors">
          Smart Find
        </Link>
        <span>/</span>
        <span className="text-gray-900">{sector.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          {sector.icon && (
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sector.icon === 'house' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                )}
                {sector.icon === 'hospital' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                )}
                {sector.icon === 'building' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                )}
              </svg>
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {sector.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choisissez une scène pour découvrir les produits adaptés à votre besoin.
        </p>
      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sector.scenes.map((scene) => (
          <Link
            key={scene.slug}
            href={`/smart-find/${sectorSlug}/${scene.slug}`}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {/* Scene thumbnail */}
                <img
                  src={scene.svg}
                  alt={scene.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {scene.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {scene.hotspots.length} point{scene.hotspots.length > 1 ? 's' : ''} d'interaction
                </p>
                
                <div className="space-y-1">
                  {scene.hotspots.slice(0, 3).map((hotspot) => (
                    <div key={hotspot.id} className="text-sm text-gray-500">
                      • {hotspot.title}
                    </div>
                  ))}
                  {scene.hotspots.length > 3 && (
                    <div className="text-sm text-gray-500">
                      • et {scene.hotspots.length - 3} autre{scene.hotspots.length - 3 > 1 ? 's' : ''}...
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium">Explorer cette scène</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Back to sectors */}
      <div className="mt-12 text-center">
        <Link
          href="/smart-find"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux secteurs
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const smartFindConfig = await getSmartFind();
  
  return smartFindConfig.sectors.map((sector) => ({
    sector: sector.slug,
  }));
}
