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

// Smart Find types
export interface Hotspot {
  id: string;
  title: string;
  shape: "rect" | "circle";
  coordsPct: number[]; // rect: [x,y,w,h], circle: [cx,cy,r] all in %
  filters: { 
    category?: string; 
    tags?: string[]; 
    specs?: Record<string,string> 
  };
}

export interface Scene {
  slug: string; 
  name: string;
  svg: string; // /smartfind/*.svg in /public
  hotspots: Hotspot[];
}

export interface Sector {
  slug: string; 
  name: string; 
  icon?: string;
  scenes: Scene[];
}

export interface SmartFindConfig { 
  sectors: Sector[] 
}