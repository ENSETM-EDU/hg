'use client';

import Link from 'next/link';
import { Scene } from '@/types';

interface SceneViewerProps {
  scene: Scene;
  sectorSlug: string;
}

export function SceneViewer({ scene, sectorSlug }: SceneViewerProps) {
  const generateResultsUrl = (hotspot: Scene['hotspots'][0]) => {
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
    return `/smart-find/results?${queryParams.toString()}`;
  };

  return (
    <div className="relative bg-gray-50">
      {/* Scene Image */}
      <div className="relative w-full aspect-video">
        <img
          src={scene.svg}
          alt={scene.name}
          className="w-full h-full object-contain"
        />
        
        {/* Hotspots */}
        {scene.hotspots.map((hotspot) => {
          const resultsUrl = generateResultsUrl(hotspot);
          
          if (hotspot.shape === 'rect') {
            const [x, y, w, h] = hotspot.coordsPct;
            return (
              <Link
                key={hotspot.id}
                href={resultsUrl}
                className="absolute group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                }}
                aria-label={hotspot.title}
                title={hotspot.title}
              >
                <button className="w-full h-full bg-blue-500 bg-opacity-20 border-2 border-blue-500 border-opacity-50 rounded hover:bg-opacity-40 hover:border-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 group">
                  <span className="sr-only">{hotspot.title}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {hotspot.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </button>
              </Link>
            );
          } else if (hotspot.shape === 'circle') {
            const [cx, cy, r] = hotspot.coordsPct;
            return (
              <Link
                key={hotspot.id}
                href={resultsUrl}
                className="absolute group"
                style={{
                  left: `${cx - r}%`,
                  top: `${cy - r}%`,
                  width: `${r * 2}%`,
                  height: `${r * 2}%`,
                }}
                aria-label={hotspot.title}
                title={hotspot.title}
              >
                <button className="w-full h-full bg-blue-500 bg-opacity-20 border-2 border-blue-500 border-opacity-50 rounded-full hover:bg-opacity-40 hover:border-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 group">
                  <span className="sr-only">{hotspot.title}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {hotspot.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </button>
              </Link>
            );
          }
          
          return null;
        })}
      </div>
      
      {/* Instructions */}
      <div className="p-4 bg-blue-50 border-t border-blue-200">
        <div className="flex items-center text-sm text-blue-800">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Survolez ou cliquez sur les zones colorées pour découvrir les produits correspondants.
          </span>
        </div>
      </div>
    </div>
  );
}
