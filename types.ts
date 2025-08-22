export interface Brand {
  slug: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon?: string;
  description?: string;
  subcategories?: Array<{
    name: string;
    slug: string;
  }>;
}

export interface Download {
  label: string;
  url: string;
}

export interface AR {
  model: string;
  type?: "webxr" | "usdz" | "8thwall";
}

export interface Product {
  id?: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  reference?: string;
  description: string;
  images?: string[];
  downloads?: Download[];
  specs?: Record<string, string | number | boolean>;
  tags?: string[];
  ar?: AR;
  attributes?: Record<string, any>;
  "3d_images"?: string[];
  categoryHierarchy?: {
    root: string;
    parent: string;
    subcategory: string;
  };
}

export interface Catalogs {
  consolidated?: {
    label: string;
    url: string;
  };
  brands?: Array<{
    brand: string;
    label: string;
    url: string;
  }>;
}

export interface Home {
  hero: Array<{
    type: "product" | "brand" | "category";
    slug: string;
  }>;
  featuredBrands?: string[];
  featuredCategories?: string[];
  news?: Array<{
    title: string;
    date: string;
    href: string;
  }>;
}

export interface Settings {
  siteName: string;
  theme: {
    colors: {
      primary: string;
      gray: string;
      black: string;
      white: string;
    };
    fontFamily: string;
  };
  footerDisclaimer?: string;
}

export interface Pages {
  about: {
    title: string;
    content: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
    mapUrl?: string;
  };
}

