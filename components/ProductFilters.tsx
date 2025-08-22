'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Smartphone, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Brand, Category } from '../types';

export interface FilterState {
  search: string;
  category: string | null;
  subcategory: string | null;
  brand: string | null;
  hasAR: boolean;
  hasDownloads: boolean;
  sortBy: 'name' | 'brand' | 'category' | 'newest';
  sortOrder: 'asc' | 'desc';
}

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalResults: number;
  isLoading?: boolean;
}

export default function ProductFilters({
  categories,
  brands,
  filters,
  onFiltersChange,
  totalResults,
  isLoading = false
}: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (filters.category) {
      const category = categories.find(c => c.slug === filters.category);
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [filters.category, categories]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset subcategory when category changes
    if (key === 'category') {
      newFilters.subcategory = null;
    }
    
    onFiltersChange(newFilters);
  };

  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters };
    if (key === 'category') {
      newFilters.category = null;
      newFilters.subcategory = null;
    } else if (key === 'subcategory') {
      newFilters.subcategory = null;
    } else if (key === 'brand') {
      newFilters.brand = null;
    } else if (key === 'search') {
      newFilters.search = '';
    } else if (key === 'hasAR') {
      newFilters.hasAR = false;
    } else if (key === 'hasDownloads') {
      newFilters.hasDownloads = false;
    } else if (key === 'sortBy') {
      newFilters.sortBy = 'name';
    } else if (key === 'sortOrder') {
      newFilters.sortOrder = 'asc';
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      category: null,
      subcategory: null,
      brand: null,
      hasAR: false,
      hasDownloads: false,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = [
    filters.search,
    filters.category,
    filters.subcategory,
    filters.brand,
    filters.hasAR,
    filters.hasDownloads
  ].filter(Boolean).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un produit, une marque, une référence..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 pr-4 py-3 w-full text-lg"
          />
          {filters.search && (
            <button
              onClick={() => clearFilter('search')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  Catégorie
                  {filters.category && (
                    <Badge variant="secondary" className="ml-2">
                      1
                    </Badge>
                  )}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">Sélectionner une catégorie</h4>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {categories.map((category) => (
                      <div key={category.slug} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.slug}
                          checked={filters.category === category.slug}
                          onCheckedChange={(checked) => 
                            handleFilterChange('category', checked ? category.slug : null)
                          }
                        />
                        <label
                          htmlFor={category.slug}
                          className="text-sm cursor-pointer flex-1 hover:text-hava-primary"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Subcategory Filter */}
            {selectedCategory?.subcategories && (
              <Select 
                value={filters.subcategory || 'all'} 
                onValueChange={(value) => handleFilterChange('subcategory', value === 'all' ? null : value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sous-catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sous-catégories</SelectItem>
                  {selectedCategory.subcategories.map((sub) => (
                    <SelectItem key={sub.slug} value={sub.name}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Brand Filter */}
            <Select 
              value={filters.brand || 'all'} 
              onValueChange={(value) => handleFilterChange('brand', value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Marque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les marques</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.slug} value={brand.slug}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Feature Filters */}
            <div className="flex gap-2">
              <Button
                variant={filters.hasAR ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('hasAR', !filters.hasAR)}
                className="h-10"
              >
                <Smartphone className="w-4 h-4 mr-1" />
                AR
              </Button>
              <Button
                variant={filters.hasDownloads ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('hasDownloads', !filters.hasDownloads)}
                className="h-10"
              >
                <Download className="w-4 h-4 mr-1" />
                Docs
              </Button>
            </div>
          </div>

          {/* Sort and Results */}
          <div className="flex items-center gap-3">
            <Select 
              value={`${filters.sortBy}-${filters.sortOrder}`} 
              onValueChange={(value) => {
                const [sortBy, sortOrder] = value.split('-') as [typeof filters.sortBy, typeof filters.sortOrder];
                onFiltersChange({ ...filters, sortBy, sortOrder });
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nom A-Z</SelectItem>
                <SelectItem value="name-desc">Nom Z-A</SelectItem>
                <SelectItem value="brand-asc">Marque A-Z</SelectItem>
                <SelectItem value="brand-desc">Marque Z-A</SelectItem>
                <SelectItem value="newest-desc">Plus récents</SelectItem>
                <SelectItem value="category-asc">Catégorie A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600">
              {isLoading ? 'Recherche...' : `${totalResults} résultat${totalResults > 1 ? 's' : ''}`}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 items-center mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">Filtres actifs:</span>
            
            {filters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Recherche: "{filters.search}"
                <button onClick={() => clearFilter('search')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find(c => c.slug === filters.category)?.name}
                <button onClick={() => clearFilter('category')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.subcategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.subcategory}
                <button onClick={() => clearFilter('subcategory')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.brand && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {brands.find(b => b.slug === filters.brand)?.name}
                <button onClick={() => clearFilter('brand')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.hasAR && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Réalité Augmentée
                <button onClick={() => clearFilter('hasAR')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.hasDownloads && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Documentation
                <button onClick={() => clearFilter('hasDownloads')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-hava-primary hover:text-hava-primary-dark"
            >
              Effacer tout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
