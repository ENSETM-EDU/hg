import { NextRequest, NextResponse } from 'next/server';
import { loadJSON } from '@/lib/data';
import { queryProducts, parseTags, parseSpecs } from '@/lib/smartfind';
import { Product } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category') || undefined;
    const tagsParam = searchParams.get('tags') || undefined;
    const specsParam = searchParams.get('specs') || undefined;
    
    const tags = parseTags(tagsParam);
    const specs = parseSpecs(specsParam);
    
    // Load products on the server side
    const products = await loadJSON<Product[]>('products.json');
    
    // Filter products using the client-side compatible function
    const filteredProducts = queryProducts(products, {
      category,
      tags: tags.length > 0 ? tags : undefined,
      specs: Object.keys(specs).length > 0 ? specs : undefined,
    });

    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      filters: {
        category,
        tags,
        specs,
      },
    });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Failed to search products', products: [] },
      { status: 500 }
    );
  }
}
