import placeholderImg from './assets/Saree.jpg';
import Netsaree from './assets/Netsaree.jpg';
import Banarasi from './assets/Banarasi.jpg';
import Banarasi1 from './assets/Banarasi1.jpeg';
import Hero from './assets/hero.png';
import Jhumka from './assets/Jhumka.jpg';
import Earring from './assets/Earring.webp';
import Necklace1 from './assets/Necklace1.webp';
import South from './assets/south.jpg';
import Smartphone from './assets/Smartphone.png';
import Smartwtch from './assets/Smartwtch.webp';
import USBCharger from './assets/USB charger.webp';
import Wirelessearbuds from './assets/Wirelessearbuds.jpg';
import Bedsheet from './assets/bedsheet.jpg';
import Stainless from './assets/Stainless.jpg';
import Ledbuld from './assets/Ledbuld.jpg';
import Skincarekit from './assets/Skincarekit.jpg';
import Serum from './assets/Serum.webp';
import Lipstick from './assets/Lipstick.jpg';

// Keep specific product fallbacks (useful for items without good external images)
export const productFallbackImages = {
  1: Netsaree,
  2: Banarasi,
  3: South,
  4: Banarasi1,
  5: Netsaree,
  6: Earring,
  7: Necklace1,
  8: Jhumka,
  9: Smartphone,
  10: Wirelessearbuds,
  11: Smartwtch,
  12: USBCharger,
  13: Bedsheet,
  14: Stainless,
  15: Ledbuld,
  16: Skincarekit,
  17: Serum,
  18: Lipstick,
};

// Subcategory-level images
export const subcategoryFallbackImages = {
  Mobiles: Smartphone,
  Accessories: Wirelessearbuds,
  Wearables: Smartwtch,
  Bedding: Bedsheet,
  Kitchen: Stainless,
  Lighting: Ledbuld,
  Skincare: Skincarekit,
  'Hair Care': Serum,
  Makeup: Lipstick,
};

// Category-level generic fallbacks
export const categoryFallbackImages = {
  Fashion: Netsaree,
  Electronics: Smartphone,
  Home: Bedsheet,
  Beauty: Skincarekit,
};

export const getProductImage = (product) => {
  if (!product) return placeholderImg;

  // prefer real product.image if not a placeholder
  if (product.image && !product.image.includes('via.placeholder.com')) {
    return product.image;
  }

  // per-product explicit mapping
  if (productFallbackImages[product.id]) return productFallbackImages[product.id];

  // try subcategory
  if (product.subcategory && subcategoryFallbackImages[product.subcategory]) {
    return subcategoryFallbackImages[product.subcategory];
  }

  // try category
  if (product.category && categoryFallbackImages[product.category]) {
    return categoryFallbackImages[product.category];
  }

  return placeholderImg;
};

export { placeholderImg };