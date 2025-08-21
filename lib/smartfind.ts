import { Product } from '@/types';

export interface SearchFilters {
  category?: string;
  tags?: string[];
  specs?: Record<string, string>;
}

/**
 * Query products based on filters - CLIENT-SIDE VERSION
 * This version receives products as a parameter instead of loading them
 */
export function queryProducts(products: Product[], filters: SearchFilters): Product[] {
  try {
    return products.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Tags filter (AND logic - product must have ALL specified tags)
      if (filters.tags && filters.tags.length > 0) {
        if (!product.tags || product.tags.length === 0) {
          return false;
        }
        
        const productTags = product.tags.map(tag => tag.toLowerCase());
        const filterTags = filters.tags.map(tag => tag.toLowerCase());
        
        // Check if product has all filter tags
        const hasAllTags = filterTags.every(filterTag => 
          productTags.some(productTag => productTag.includes(filterTag))
        );
        
        if (!hasAllTags) {
          return false;
        }
      }
      
      // Specs filter (AND logic - product must match ALL specified specs)
      if (filters.specs && Object.keys(filters.specs).length > 0) {
        if (!product.specs || Object.keys(product.specs).length === 0) {
          return false;
        }
        
        // Check if product has all required specs with matching values
        const hasAllSpecs = Object.entries(filters.specs).every(([key, value]) => {
          const productValue = product.specs![key];
          if (!productValue) return false;
          
          // Convert to string and do case-insensitive partial match
          const productValueStr = String(productValue).toLowerCase();
          const filterValueStr = value.toLowerCase();
          
          return productValueStr.includes(filterValueStr);
        });
        
        if (!hasAllSpecs) {
          return false;
        }
      }
      
      return true;
    });
  } catch (error) {
    console.error('Error querying products:', error);
    return [];
  }
}

export function parseTags(tagsParam?: string): string[] {
  if (!tagsParam) return [];
  return tagsParam.split(',').map(tag => tag.trim()).filter(Boolean);
}

export function parseSpecs(specsParam?: string): Record<string, string> {
  if (!specsParam) return {};
  
  const specs: Record<string, string> = {};
  const pairs = specsParam.split('|');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split(':');
    if (key && value) {
      specs[key.trim()] = value.trim();
    }
  });
  
  return specs;
}

export function toTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
