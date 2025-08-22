const fs = require('fs');
const path = require('path');

const productsDir = './data/products';

// Get all JSON files in the products directory
const files = fs.readdirSync(productsDir).filter(file => file.endsWith('.json'));

console.log(`Found ${files.length} JSON files to update...`);

files.forEach(file => {
  const filePath = path.join(productsDir, file);
  console.log(`Processing ${file}...`);
  
  try {
    // Read the JSON file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add images and 3d_images fields to each product
    const updatedData = data.map(product => ({
      ...product,
      images: [],
      "3d_images": []
    }));
    
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`✓ Updated ${file}`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log('All files processed!');
