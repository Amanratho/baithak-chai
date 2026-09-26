import sharp from 'sharp';

async function cleanPouch(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = 4;

  const isBackground = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Any bright studio floor or grayish shadow outside the pouch
    return (r > 220 && g > 220 && b > 220) || (r > 200 && g > 195 && b > 190 && y > height * 0.94);
  };

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) {
      visited[0 * width + x] = 1;
      queue[tail++] = x;
    }
    if (isBackground(x, height - 1)) {
      visited[(height - 1) * width + x] = 1;
      queue[tail++] = ((height - 1) << 16) | x;
    }
  }

  for (let y = 0; y < height; y++) {
    if (isBackground(0, y) && !visited[y * width + 0]) {
      visited[y * width + 0] = 1;
      queue[tail++] = (y << 16) | 0;
    }
    if (isBackground(width - 1, y) && !visited[y * width + (width - 1)]) {
      visited[y * width + (width - 1)] = 1;
      queue[tail++] = (y << 16) | (width - 1);
    }
  }

  while (head < tail) {
    const curr = queue[head++];
    const cx = curr & 0xffff;
    const cy = curr >> 16;

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!visited[nIndex] && isBackground(nx, ny)) {
          visited[nIndex] = 1;
          queue[tail++] = (ny << 16) | nx;
        }
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (visited[y * width + x]) {
        data[idx + 3] = 0;
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log('Cleaned pouch generated:', outputPath);
}

async function run() {
  await cleanPouch(
    'public/assets/baithak_pouch_front.jpg',
    'public/assets/baithak_pouch_front_clean.png'
  );
  await cleanPouch(
    'public/assets/baithak_pouch_back.jpg',
    'public/assets/baithak_pouch_back_clean.png'
  );
}

run();
