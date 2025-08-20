'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Package, Tag, FileText, Smartphone, Info, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Marques', href: '/marques', icon: Tag },
  { name: 'Produits', href: '/produits', icon: Package },
  { name: 'Catalogues', href: '/catalogues', icon: FileText },
  { name: 'Réalité Augmentée', href: '/ar', icon: Smartphone },
  { name: 'À propos', href: '/a-propos', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b-2 border-hava-primary sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                {/* Knife-like shape background */}
                <div className="bg-transparent text-white font-bold text-xl px-4 py-2 relative overflow-hidden">
                  <div className="relative z-10 flex items-center">
                    <Image
                      src="/hava_logo.svg"
                      alt="HAVA Logo"
                      width={150}
                      height={28}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200',
                      active
                        ? 'bg-hava-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-hava-primary'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t bg-white">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 text-base font-medium transition-colors',
                      active
                        ? 'bg-hava-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-hava-primary'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}