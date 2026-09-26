import sharp from 'sharp';

async function optimizeImages() {
  console.log('Optimizing images to modern high-performance WebP/compressed formats...');

  // 1. Assam Tea Garden (Hero background)
  await sharp('public/assets/assam_tea_garden.jpg')
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile('public/assets/assam_tea_garden.webp');

  // 2. Front Pouch Clean
  await sharp('public/assets/baithak_pouch_front_clean.png')
    .resize(800, null, { fit: 'inside' })
    .webp({ quality: 90, effort: 6 })
    .toFile('public/assets/baithak_pouch_front.webp');

  // 3. Back Pouch Clean
  await sharp('public/assets/baithak_pouch_back_clean.png')
    .resize(800, null, { fit: 'inside' })
    .webp({ quality: 90, effort: 6 })
    .toFile('public/assets/baithak_pouch_back.webp');

  // 4. Steaming Chai Cup
  await sharp('public/assets/steaming_chai_cup.jpg')
    .resize(1000, 750, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile('public/assets/steaming_chai_cup.webp');

  // 5. Brand Logo
  await sharp('public/assets/brand_logo.jpg')
    .resize(300, 300, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile('public/assets/brand_logo.webp');

  // 6. Baithak Crest
  await sharp('public/assets/baithak_crest.jpg')
    .resize(400, 400, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile('public/assets/baithak_crest.webp');

  console.log('All images optimized successfully!');
}

optimizeImages();
