import { promises as fs } from 'fs';
import path from 'path';
import { Brand, Category, Product, Home, Settings, Catalogs, Pages } from '../types';

const dataDir = path.join(process.cwd(), 'data');

export async function loadJSON<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(dataDir, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    throw error;
  }
}

export async function getSettings(): Promise<Settings> {
  return loadJSON<Settings>('settings.json');
}

export async function getHome(): Promise<Home> {
  return loadJSON<Home>('homepage.json');
}

export async function getBrands(): Promise<Brand[]> {
  return loadJSON<Brand[]>('brands.json');
}

export async function getProducts(): Promise<Product[]> {
  return loadJSON<Product[]>('all-products-with-hierarchy.json');
}

export async function getCatalogs(): Promise<Catalogs> {
  return loadJSON<Catalogs>('catalogs.json');
}

export async function getPages(): Promise<Pages> {
  return loadJSON<Pages>('pages.json');
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Load hierarchical categories
    const hierarchicalCategories = await loadJSON<any[]>('category-hierarchy.json');
    return hierarchicalCategories.map(cat => ({
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      description: cat.description,
      subcategories: cat.subcategories
    }));
  } catch {
    // Fallback to old method if file doesn't exist
    const products = await getProducts();
    const categorySet = new Set<string>();
    
    products.forEach(product => {
      if (product.categoryHierarchy?.root) {
        categorySet.add(product.categoryHierarchy.root);
      } else {
        categorySet.add(product.category);
      }
    });

    return Array.from(categorySet).map(slug => ({
      slug,
      name: toTitle(slug)
    }));
  }
}

export function toTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => {
    // Check if it matches the root category (hierarchical) or the original category
    return product.categoryHierarchy?.root === categorySlug || 
           product.category === categorySlug;
  });
}

export async function getProductsBySubcategory(subcategorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.category === subcategorySlug);
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  const products = await getProducts();
  const brands = await getBrands();
  
  // Decode URL-encoded slug to handle spaces and special characters
  const decodedSlug = decodeURIComponent(brandSlug);
  
  // Find the brand by slug
  const brand = brands.find(b => b.slug === decodedSlug);
  if (!brand) return [];
  
  // Filter products by brand name (products reference brand by name, not slug)
  return products.filter(product => product.brand === brand.name);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(product => product.slug === slug) || null;
}

export async function getBrand(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  // Decode URL-encoded slug to handle spaces and special characters
  const decodedSlug = decodeURIComponent(slug);
  return brands.find(brand => brand.slug === decodedSlug) || null;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(category => category.slug === slug) || null;
}

export async function getARProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.ar);
}

export async function getCategoriesForBrand(brandSlug: string): Promise<Category[]> {
  const products = await getProductsByBrand(brandSlug);
  const categorySet = new Set<string>();
  
  products.forEach(product => {
    if (product.categoryHierarchy?.root) {
      categorySet.add(product.categoryHierarchy.root);
    } else {
      categorySet.add(product.category);
    }
  });

  const allCategories = await getCategories();
  return allCategories.filter(category => categorySet.has(category.slug));
}

export async function getProductCountByCategory(): Promise<Record<string, number>> {
  const products = await getProducts();
  const counts: Record<string, number> = {};
  
  products.forEach(product => {
    // Count by hierarchical root category
    if (product.categoryHierarchy?.root) {
      counts[product.categoryHierarchy.root] = (counts[product.categoryHierarchy.root] || 0) + 1;
    } else {
      // Fallback to original category
      counts[product.category] = (counts[product.category] || 0) + 1;
    }
  });
  
  return counts;
}

export async function getSubcategoriesForCategory(categorySlug: string): Promise<string[]> {
  try {
    const hierarchicalCategories = await loadJSON<any[]>('category-hierarchy.json');
    const category = hierarchicalCategories.find(cat => cat.slug === categorySlug);
    return category?.subcategories?.map((sub: any) => sub.name) || [];
  } catch {
    return [];
  }
}

export async function getCategoryHierarchy(): Promise<any[]> {
  try {
    return loadJSON<any[]>('category-hierarchy.json');
  } catch {
    return [];
  }
}

// New filtering functions for enhanced UX
export interface ProductFilters {
  category?: string | null;
  subcategory?: string | null;
  brand?: string | null;
  search?: string;
  hasAR?: boolean;
  hasDownloads?: boolean;
  sortBy?: 'name' | 'brand' | 'category' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export async function getFilteredProducts(filters: ProductFilters): Promise<Product[]> {
  let products = await getProducts();

  // Filter by category
  if (filters.category) {
    products = products.filter(product => 
      product.categoryHierarchy?.root === filters.category
    );
  }

  // Filter by subcategory
  if (filters.subcategory) {
    products = products.filter(product => 
      product.category === filters.subcategory
    );
  }

  // Filter by brand
  if (filters.brand) {
    products = products.filter(product => 
      product.brand.toLowerCase() === filters.brand?.toLowerCase()
    );
  }

  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.reference?.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by AR availability
  if (filters.hasAR) {
    products = products.filter(product => product.ar);
  }

  // Filter by downloads availability
  if (filters.hasDownloads) {
    products = products.filter(product => 
      product.downloads && product.downloads.length > 0
    );
  }

  // Sort products
  if (filters.sortBy) {
    products.sort((a, b) => {
      let compareValue = 0;
      
      switch (filters.sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'brand':
          compareValue = a.brand.localeCompare(b.brand);
          break;
        case 'category':
          compareValue = a.category.localeCompare(b.category);
          break;
        case 'newest':
          compareValue = (b.id || 0) - (a.id || 0);
          break;
        default:
          compareValue = 0;
      }
      
      return filters.sortOrder === 'desc' ? -compareValue : compareValue;
    });
  }

  return products;
}

export async function getProductStats(): Promise<{
  totalProducts: number;
  totalBrands: number;
  totalCategories: number;
  productsWithAR: number;
  productsWithDownloads: number;
  brandDistribution: Array<{brand: string; count: number}>;
  categoryDistribution: Array<{category: string; count: number}>;
}> {
  const products = await getProducts();
  const brands = await getBrands();
  const categories = await getCategories();

  const brandCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  
  let arCount = 0;
  let downloadCount = 0;

  products.forEach(product => {
    // Count by brand
    brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
    
    // Count by root category
    const rootCategory = product.categoryHierarchy?.root || product.category;
    categoryCounts[rootCategory] = (categoryCounts[rootCategory] || 0) + 1;
    
    // Count special features
    if (product.ar) arCount++;
    if (product.downloads && product.downloads.length > 0) downloadCount++;
  });

  return {
    totalProducts: products.length,
    totalBrands: brands.length,
    totalCategories: categories.length,
    productsWithAR: arCount,
    productsWithDownloads: downloadCount,
    brandDistribution: Object.entries(brandCounts)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count),
    categoryDistribution: Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
  };
}