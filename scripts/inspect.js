import sharp from 'sharp';

async function check() {
  const metaFront = await sharp('public/assets/baithak_pouch_front.jpg').metadata();
  console.log('Front metadata:', metaFront.width, metaFront.height);

  const { data, info } = await sharp('public/assets/baithak_pouch_front.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Check corner pixels (top-left, top-right, bottom-left, bottom-right)
  const getPixel = (x, y) => {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  };

  console.log('Top Left (5, 5):', getPixel(5, 5));
  console.log('Top Right (width-5, 5):', getPixel(info.width - 5, 5));
  console.log('Bottom Left (5, height-5):', getPixel(5, info.height - 5));
}

check();
