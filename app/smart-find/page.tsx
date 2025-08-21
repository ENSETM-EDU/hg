import Link from 'next/link';
import { getSmartFind } from '@/lib/data';
import { toTitle } from '@/lib/smartfind';

export default async function SmartFindPage() {
  const smartFindConfig = await getSmartFind();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Smart Find
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Trouvez facilement les produits adaptés à votre projet en explorant nos solutions par secteur d'activité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smartFindConfig.sectors.map((sector) => (
          <Link
            key={sector.slug}
            href={`/smart-find/${sector.slug}`}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                {sector.icon && (
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    {/* Icon placeholder - you can replace with actual icons */}
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {sector.name}
                  </h2>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {sector.scenes.length} scène{sector.scenes.length > 1 ? 's' : ''} disponible{sector.scenes.length > 1 ? 's' : ''}
              </p>
              
              <div className="space-y-2">
                {sector.scenes.slice(0, 3).map((scene) => (
                  <div key={scene.slug} className="text-sm text-gray-500">
                    • {scene.name}
                  </div>
                ))}
                {sector.scenes.length > 3 && (
                  <div className="text-sm text-gray-500">
                    • et {sector.scenes.length - 3} autre{sector.scenes.length - 3 > 1 ? 's' : ''}...
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium">Explorer ce secteur</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Besoin d'aide ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe est là pour vous accompagner dans le choix de vos produits.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
