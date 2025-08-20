import { promises as fs } from 'fs';
import path from 'path';
import { Brand, Category, Product, Home, Settings, Catalogs, Pages } from '../types';

const dataDir = path.join(process.cwd(), 'data');

async function loadJSON<T>(filename: string): Promise<T> {
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
  return loadJSON<Product[]>('products.json');
}

export async function getCatalogs(): Promise<Catalogs> {
  return loadJSON<Catalogs>('catalogs.json');
}

export async function getPages(): Promise<Pages> {
  return loadJSON<Pages>('pages.json');
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Try to load from categories.json first
    return await loadJSON<Category[]>('categories.json');
  } catch {
    // If categories.json doesn't exist, derive from products
    const products = await getProducts();
    const categorySet = new Set<string>();
    
    products.forEach(product => {
      categorySet.add(product.category);
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
  return products.filter(product => product.category === categorySlug);
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.brand === brandSlug);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(product => product.slug === slug) || null;
}

export async function getBrand(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find(brand => brand.slug === slug) || null;
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
    categorySet.add(product.category);
  });

  const allCategories = await getCategories();
  return allCategories.filter(category => categorySet.has(category.slug));
}

export async function getProductCountByCategory(): Promise<Record<string, number>> {
  const products = await getProducts();
  const counts: Record<string, number> = {};
  
  products.forEach(product => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  
  return counts;
}