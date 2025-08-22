const fs = require('fs');

// Read all products from the consolidated file (since all-products.json was removed)
const allProducts = JSON.parse(fs.readFileSync('../all-products-with-hierarchy.json', 'utf8'));

// Extract all unique categories
const allCategories = [...new Set(allProducts.map(p => p.category))].sort();

// Define category hierarchy mapping
const categoryHierarchy = {
  "serrures": {
    name: "Serrures",
    slug: "serrures",
    icon: "/categories/serrures.svg",
    subcategories: [
      "Serrures porte en bois / sécurité",
      "Serrures bois",
      "Serrures bois / portes blindées", 
      "Serrures portes blindées",
      "Serrures alu",
      "Serrures électroniques",
      "Serrure électronique (connectée)",
      "Serrure électrique",
      "Serrures de meuble",
      "Serrures multipoints",
      "Serrures 3 points",
      "Serrures 3 et 5 points",
      "Serrures de sûreté (gâche tirage)",
      "Serrures garages / à tirage",
      "Serrures (ensemble)",
      "Serrures (antipanique)",
      "Serrures (coupe-feu)",
      "Serrure coupe-feu (antipanique)",
      "Serrure encastrée pour antipanique",
      "Serrure magnétique à larder",
      "Serrures",
      "Verrous / Serrures magnétiques"
    ]
  },
  
  "cylindres": {
    name: "Cylindres",
    slug: "cylindres", 
    icon: "/categories/cylindres.svg",
    subcategories: [
      "Cylindres",
      "Cylindres à bouton",
      "Cylindres avec passes",
      "Cylindres haute sécurité",
      "Demi-cylindres",
      "Demi-cylindres à bouton"
    ]
  },
  
  "poignees": {
    name: "Poignées",
    slug: "poignees",
    icon: "/categories/poignees.svg", 
    subcategories: [
      "Poignées / Béquilles",
      "Poignées / Accessoires",
      "Poignée palière",
      "Poignée plaque",
      "Poignées plaques",
      "Béquilles rosaces",
      "Béquilles",
      "Poignée externe pour antipanique avec cylindre",
      "Poignée externe pour antipanique avec demi-cylindre"
    ]
  },
  
  "ferme-portes": {
    name: "Ferme-portes",
    slug: "ferme-portes",
    icon: "/categories/ferme-portes.svg",
    subcategories: [
      "Fermes-portes",
      "Fermes-portes encastrés",
      "Pivots de sol hydraulique",
      "Opérateur de porte battante"
    ]
  },
  
  "coulissant": {
    name: "Systèmes coulissants",
    slug: "coulissant", 
    icon: "/categories/coulissant.svg",
    subcategories: [
      "Système coulissant apparent soft close",
      "Système coulissant de placard apparent", 
      "Système coulissant de porte apparent",
      "Système coulissant de porte escamotable",
      "Système coulissant de porte",
      "Système coulissant pour meuble",
      "Système coulissant soft close",
      "Système coulissant télescopique",
      "Système de porte coulissante de placard",
      "Système de porte pliante",
      "Système accordéon de porte",
      "Accessoires pour système coulissant"
    ]
  },
  
  "automatismes": {
    name: "Automatismes",
    slug: "automatismes",
    icon: "/categories/automatismes.svg",
    subcategories: [
      "Gâches électriques",
      "Ventouses électromagnétiques",
      "Ventouses électromagnétiques (arrêt de porte)",
      "Contrôle d'accès pour hôtels",
      "Solutions smart",
      "Caméras",
      "Accessoires serrure électrique"
    ]
  },
  
  "accessoires": {
    name: "Accessoires",
    slug: "accessoires",
    icon: "/categories/accessoires.svg",
    subcategories: [
      "Accessoires",
      "Accessoires de serrurerie",
      "Accessoires de portes",
      "Accessoires de fixation",
      "Accessoires pour antipanique",
      "Charnières",
      "Charnières invisibles",
      "Charnières invisibles hydrauliques 3D",
      "Charnière de porte invisible",
      "Charnières (certifiées coupe-feu)",
      "Charnières verre",
      "Paumelles",
      "Butoirs de portes",
      "Butée / tampon",
      "Judas de porte",
      "Sélecteur de fermeture pour 2 vantaux"
    ]
  },
  
  "antipanique": {
    name: "Antipanique",
    slug: "antipanique",
    subcategories: [
      "Antipanique en applique 2 points",
      "Antipanique en applique mono-point", 
      "Antipanique en applique monopoint",
      "Antipanique pour serrure encastrée",
      "Antipanique Touch Bar (ligne TOP)",
      "Antipanique Touch Bar",
      "Antipaniques Gamme Global",
      "Antipaniques Push Bar",
      "Module externe pour antipanique avec demi-cylindre"
    ]
  },
  
  "cadenas": {
    name: "Cadenas",
    slug: "cadenas",
    subcategories: [
      "Cadenas",
      "Cadenas à combinaison",
      "Cadenas anse blindée",
      "Cadenas anse protégée", 
      "Cadenas avec alarme",
      "Cadenas biométrique",
      "Cadenas câble",
      "Cadenas disque",
      "Cadenas TSA",
      "Cadenas TSA (x2)",
      "Cadenas U"
    ]
  },
  
  "quincaillerie-meuble": {
    name: "Quincaillerie de meuble",
    slug: "quincaillerie-meuble",
    subcategories: [
      "Coulisses à billes",
      "Coulisses classiques",
      "Coulisses tandem à sortie partielle",
      "Coulisses tandem hydrauliques à sortie totale",
      "Coulisses tandem hydrauliques",
      "Tandem (coulisses tiroirs)",
      "Tandem Box sortie totale 16 mm",
      "TandemBox slim (sortie totale 16 mm)",
      "TandemBox slim hydraulique (sortie totale 16 mm, verre latéral)",
      "TandemBox slim hydraulique (sortie totale 16 mm)",
      "Tiroirs intérieurs",
      "Tiroirs de rangement",
      "Casiers tiroirs – sortie totale 16 mm",
      "Mécanisme relevant soft close",
      "Mécanisme relevant double portes soft close",
      "Vérin à gaz",
      "Pied de meuble",
      "Pied réglable",
      "Vérin/pied réglable"
    ]
  },
  
  "amenagement-interieur": {
    name: "Aménagement intérieur",
    slug: "amenagement-interieur", 
    subcategories: [
      // Cuisine
      "Coin cuisine (plateaux d'angle)",
      "Coin cuisine (coulissant multi-niveaux)", 
      "Coins cuisine",
      "Accessoires cuisine (muraux)",
      "Accessoires évier",
      "Accessoires sous-évier",
      "Panier sous-évier / multi-usage",
      "Égouttoir escamotable",
      "Module coulissant (bouteilles, etc.)",
      "Porte épices",
      "Poubelles",
      
      // Dressing  
      "Coin dressing (plateaux ronds)",
      "Coin dressing (3 plateaux)",
      "Coin dressing (plateau + crochets)",
      "Accessoires dressing – miroir",
      "Porte pantalon",
      "Porte chaussures vertical", 
      "Porte chaussures (grille)",
      "Porte chaussures (plateau ajouré)",
      "Porte cravates",
      "Porte vestes (abattant 15 kg)",
      "Porte vestes et pantalon (carrousel bras)",
      "Porte vestes et pantalon (anneau)",
      "Crochet extractible / penderie",
      "Porte bijoux (organisateur)",
      "Plateaux à bijoux",
      "Panier vêtements (fond plein)",
      "Panier vêtements (grille)",
      "Tringle dressing (ronde) + accessoires",
      "Tringle dressing (rectangulaire) + accessoires",
      "Tendeur pour porte dressing",
      "Planche à repasser extractible",
      
      // Rangement général
      "Colonne",
      "Colonne (pivotante)",
      "Colonne coulissante",
      "Étagères escamotables",
      "Tiroir de rangement (avec séparateurs)",
      "Tiroir de rangement (panier)",
      "Tiroir à compartiments",
      "Tiroir (boîte)",
      "Tiroir coffre (lecteur d'empreintes)",
      "Module lumineux / accessoires",
      "Accessoires tiroirs",
      "Accessoires – Intérieurs tiroirs",
      "Accessoires – Tapis",
      "Accessoires Flowbox"
    ]
  },

  "profiles-aluminium": {
    name: "Profilés aluminium",
    slug: "profiles-aluminium",
    subcategories: [
      "Profiles en Aluminium",
      "Profilé",
      "Bâton maréchal"
    ]
  },
  
  "coffres-forts": {
    name: "Coffres forts",
    slug: "coffres-forts",
    subcategories: [
      "Coffres forts",
      "Coffres forts coupe-feu",
      "Coffres forts (armoire à fusils)",
      "Boîtes à clés murales",
      "Boîtes à monnaie / à clés",
      "Boîtes à monnaie à codes"
    ]
  },
  
  "autres": {
    name: "Autres",
    slug: "autres", 
    subcategories: [
      "Escabeaux",
      "Outils de gestion",
      "Tirettes",
      "Tringle rideau / rail",
      "Fitting",
      "Bouton de tirage cuvette",
      "Poussoir",
      "Verrous / Tirage"
    ]
  }
};

// Map each product to its hierarchical category
const productsWithHierarchy = allProducts.map(product => {
  let rootCategory = "autres";
  let parentCategory = "Autres";
  
  // Find which root category this product belongs to
  for (const [key, categoryInfo] of Object.entries(categoryHierarchy)) {
    if (categoryInfo.subcategories.includes(product.category)) {
      rootCategory = key;
      parentCategory = categoryInfo.name;
      break;
    }
  }
  
  return {
    ...product,
    categoryHierarchy: {
      root: rootCategory,
      parent: parentCategory,
      subcategory: product.category
    }
  };
});

// Generate category structure for UI
const categoryStructure = Object.entries(categoryHierarchy).map(([key, info]) => ({
  slug: key,
  name: info.name,
  icon: info.icon,
  description: `Tous les produits de ${info.name.toLowerCase()}`,
  subcategories: info.subcategories.map(subcat => ({
    name: subcat,
    slug: subcat.toLowerCase()
      .replace(/[^a-z0-9\\s-]/g, '')
      .replace(/\\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }))
}));

// Write files
fs.writeFileSync('../all-products-with-hierarchy.json', JSON.stringify(productsWithHierarchy, null, 2));
fs.writeFileSync('../category-hierarchy.json', JSON.stringify(categoryStructure, null, 2));

// Generate statistics
const stats = {
  totalProducts: productsWithHierarchy.length,
  totalBrands: [...new Set(productsWithHierarchy.map(p => p.brand))].length,
  totalRootCategories: Object.keys(categoryHierarchy).length,
  totalSubcategories: allCategories.length,
  categoryBreakdown: Object.entries(categoryHierarchy).map(([key, info]) => ({
    category: info.name,
    subcategories: info.subcategories.length,
    products: productsWithHierarchy.filter(p => p.categoryHierarchy.root === key).length
  }))
};

// Removed product-statistics.json generation since it's not being used

console.log('✅ Product consolidation completed!');
console.log(`📊 Statistics:`);
console.log(`   - Total products: ${stats.totalProducts}`);
console.log(`   - Total brands: ${stats.totalBrands}`);
console.log(`   - Root categories: ${stats.totalRootCategories}`);
console.log(`   - Subcategories: ${stats.totalSubcategories}`);
console.log(`\n📁 Files created:`);
console.log('   - all-products-with-hierarchy.json');
console.log('   - category-hierarchy.json');
