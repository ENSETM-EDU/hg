import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSmartFind } from '@/lib/data';
import { SceneViewer } from './SceneViewer';

interface ScenePageProps {
  params: Promise<{ sector: string; scene: string }>;
}

export default async function ScenePage({ params }: ScenePageProps) {
  const { sector: sectorSlug, scene: sceneSlug } = await params;
  const smartFindConfig = await getSmartFind();
  
  const sector = smartFindConfig.sectors.find(s => s.slug === sectorSlug);
  const scene = sector?.scenes.find(s => s.slug === sceneSlug);
  
  if (!sector || !scene) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/smart-find" className="hover:text-blue-600 transition-colors">
          Smart Find
        </Link>
        <span>/</span>
        <Link href={`/smart-find/${sectorSlug}`} className="hover:text-blue-600 transition-colors">
          {sector.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{scene.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main scene viewer */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {scene.name}
              </h1>
              <p className="text-gray-600">
                Cliquez sur les zones interactives pour découvrir nos produits
              </p>
            </div>
            
            <SceneViewer scene={scene} sectorSlug={sectorSlug} />
          </div>
        </div>

        {/* Hotspots sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Points d'interaction
            </h2>
            
            <div className="space-y-3">
              {scene.hotspots.map((hotspot) => {
                const queryParams = new URLSearchParams();
                if (hotspot.filters.category) {
                  queryParams.set('category', hotspot.filters.category);
                }
                if (hotspot.filters.tags) {
                  queryParams.set('tags', hotspot.filters.tags.join(','));
                }
                if (hotspot.filters.specs) {
                  const specsString = Object.entries(hotspot.filters.specs)
                    .map(([key, value]) => `${key}:${value}`)
                    .join('|');
                  queryParams.set('specs', specsString);
                }
                
                const resultsUrl = `/smart-find/results?${queryParams.toString()}`;
                
                return (
                  <Link
                    key={hotspot.id}
                    href={resultsUrl}
                    className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                        {hotspot.title}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {hotspot.filters.category && (
                      <div className="text-xs text-gray-500 mt-1">
                        Catégorie: {hotspot.filters.category}
                      </div>
                    )}
                    
                    {hotspot.filters.tags && hotspot.filters.tags.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Tags: {hotspot.filters.tags.join(', ')}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href={`/smart-find/${sectorSlug}`}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux scènes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const smartFindConfig = await getSmartFind();
  
  const params: { sector: string; scene: string }[] = [];
  
  smartFindConfig.sectors.forEach((sector) => {
    sector.scenes.forEach((scene) => {
      params.push({
        sector: sector.slug,
        scene: scene.slug,
      });
    });
  });
  
  return params;
}
