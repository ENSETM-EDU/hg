# HAVA Groupe - B2B Product Catalog

A modern Next.js 15 application for HAVA Groupe's B2B product catalog, featuring multi-brand product management, AR capabilities, and a professional interface designed for contractors, installers, and distributors.

## Features

- **Multi-brand catalog** with 22+ European brands
- **Data-driven categories** automatically derived from products
- **AR product visualization** for selected items
- **Comprehensive product documentation** with PDF downloads
- **Responsive design** optimized for mobile and desktop
- **SEO optimized** with sitemap and metadata
- **French language only** (v1 requirement)
- **Professional B2B focus** (no pricing, no checkout)

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: JSON files (no database)
- **Fonts**: Montserrat (Google Fonts)
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── app/                    # Next.js 15 App Router
│   ├── (site)/            # Main site pages
│   │   ├── page.tsx       # Homepage
│   │   ├── marques/       # Brands section
│   │   ├── produits/      # Products/categories
│   │   ├── produit/       # Individual product pages
│   │   ├── catalogues/    # PDF catalogs
│   │   ├── ar/           # AR products showcase
│   │   ├── a-propos/     # About page
│   │   └── contact/      # Contact page
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/            # Reusable UI components
├── data/                 # JSON data files
├── lib/                  # Data utilities and helpers
├── public/               # Static assets
│   ├── brands/          # Brand logos (SVG)
│   ├── products/        # Product images
│   ├── catalogs/        # PDF catalogs
│   └── models/          # 3D models for AR
└── types.ts             # TypeScript type definitions
```

## Data Management

### JSON Data Files

All content is managed through JSON files in the `/data` directory:

- `settings.json` - Site configuration and branding
- `homepage.json` - Homepage content and featured items
- `brands.json` - Brand information and logos
- `all-products-with-hierarchy.json` - Complete product catalog with category hierarchy
- `category-hierarchy.json` - Product category structure
- `catalogs.json` - PDF catalog links
- `pages.json` - Static page content (about, contact)

### Adding New Products

1. Add product entry to `data/all-products-with-hierarchy.json`
2. Place product images in `public/products/`
3. Add documentation PDFs to `public/catalogs/`
4. For AR products, add 3D models to `public/models/`

### Adding New Brands

1. Add brand entry to `data/brands.json`
2. Place brand logo (SVG) in `public/brands/`
3. Optionally add brand catalog to `data/catalogs.json`

### Updating Content

All content changes require editing JSON files and redeploying the application (no database means no dynamic updates).

## Asset Management

### Brand Logos
- Format: SVG preferred
- Location: `/public/brands/`
- Naming: `BRANDNAME.svg`

### Product Images
- Formats: JPG, PNG, WebP
- Location: `/public/products/`
- Responsive images automatically handled

### Catalogs & Documentation
- Format: PDF
- Location: `/public/catalogs/`
- Linked through product `downloads` array

### AR Models
- Formats: GLB (preferred), USDZ
- Location: `/public/models/`
- Linked through product `ar` object

## Customization

### Brand Colors
Primary brand color is defined in `data/settings.json` and Tailwind config:
- Primary: #810014 (Bordeaux)
- Support colors: Gray #808080, Black #000000, White #FFFFFF

### Typography
- Primary font: Montserrat (Google Fonts)
- Configured in `app/layout.tsx`

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy automatically on commits
3. Domain configuration through Vercel dashboard

### Environment Notes

- Static export enabled (`output: 'export'`)
- No server-side runtime dependencies
- All data loaded at build time
- Content updates require redeployment

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- TypeScript strict mode enabled
- ESLint configured for Next.js
- Consistent code formatting recommended

## SEO & Performance

- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration
- Optimized metadata for all pages
- Server Components for optimal performance
- Image optimization for web

## Browser Support

- Modern browsers (ES2019+)
- Mobile-first responsive design
- Progressive enhancement approach

## Contributing

1. Follow TypeScript best practices
2. Maintain consistent component structure
3. Update relevant JSON data files
4. Test responsive design on multiple devices
5. Ensure accessibility standards

## License

Proprietary - HAVA Groupe

## Support

For technical support or questions:
- Email: contact@havagroupe.com
- Internal documentation: Check JSON schema in `types.ts`

---

**Important**: This is a B2B catalog application. All pricing and transactional features are intentionally excluded as per business requirements.# hg
