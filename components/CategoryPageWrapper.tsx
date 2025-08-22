'use client';

import { Suspense } from 'react';
import CategoryClientPage from './CategoryClientPage';
import { Product, Brand, Category } from '../types';
import { Skeleton } from './ui/skeleton';

interface CategoryPageWrapperProps {
  category: Category;
  initialProducts: Product[];
  brands: Brand[];
  allCategories: Category[];
}

function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumbs skeleton */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-96" />
            </div>
            <div className="text-right">
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPageWrapper(props: CategoryPageWrapperProps) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryClientPage {...props} />
    </Suspense>
  );
}
