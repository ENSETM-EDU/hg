'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface HeroItem {
  type: 'product' | 'brand' | 'category';
  slug: string;
  title: string;
  description: string;
  href: string;
  logo?: string;
  images?: string[];
}

interface HeroCarouselProps {
  items: HeroItem[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-hava-primary to-hava-primary/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {currentItem.title}
                </h1>
                <p className="text-xl text-white/90 max-w-lg">
                  {currentItem.description}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Link href={currentItem.href}>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-hava-primary hover:bg-gray-200"
                  >
                    Découvrir
                  </Button>
                </Link>
                <Link href="/catalogues">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white bg-hava-primary text-white hover:bg-white hover:text-hava-primary transition duration-400"
                  >
                    Catalogues
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image display */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden">
                {currentItem.type === 'brand' && currentItem.logo ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={currentItem.logo}
                      alt={`${currentItem.title} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : currentItem.type === 'product' && currentItem.images && currentItem.images.length > 0 ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={currentItem.images[0]} 
                      alt={currentItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-white/70 text-lg">
                    {currentItem.type === 'brand' ? 'Logo marque' : 
                     currentItem.type === 'product' ? 'Image produit' : 
                     'Image catégorie'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}