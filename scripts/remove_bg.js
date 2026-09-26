import sharp from 'sharp';

async function removeBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = 4; // RGBA

  // Visited array
  const visited = new Uint8Array(width * height);
  // Queue for BFS flood fill
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const isBg = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background is near white / very light gray studio floor
    return r >= 235 && g >= 235 && b >= 235;
  };

  // Push border pixels
  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) {
      visited[0 * width + x] = 1;
      queue[tail++] = (0 << 16) | x;
    }
    if (isBg(x, height - 1)) {
      visited[(height - 1) * width + x] = 1;
      queue[tail++] = ((height - 1) << 16) | x;
    }
  }

  for (let y = 0; y < height; y++) {
    if (isBg(0, y) && !visited[y * width + 0]) {
      visited[y * width + 0] = 1;
      queue[tail++] = (y << 16) | 0;
    }
    if (isBg(width - 1, y) && !visited[y * width + (width - 1)]) {
      visited[y * width + (width - 1)] = 1;
      queue[tail++] = (y << 16) | (width - 1);
    }
  }

  // BFS
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
        if (!visited[nIndex] && isBg(nx, ny)) {
          visited[nIndex] = 1;
          queue[tail++] = (ny << 16) | nx;
        }
      }
    }
  }

  // Set alpha = 0 for all flood-filled pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (visited[y * width + x]) {
        data[idx + 3] = 0; // transparent
      } else {
        // Soft feather border
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (r > 240 && g > 240 && b > 240) {
          // Check if any neighbor is visited
          let hasBgNeighbor = false;
          if (x > 0 && visited[y * width + (x - 1)]) hasBgNeighbor = true;
          if (x < width - 1 && visited[y * width + (x + 1)]) hasBgNeighbor = true;
          if (y > 0 && visited[(y - 1) * width + x]) hasBgNeighbor = true;
          if (y < height - 1 && visited[(y + 1) * width + x]) hasBgNeighbor = true;
          if (hasBgNeighbor) {
            data[idx + 3] = Math.max(0, 255 - ((r + g + b) / 3 - 235) * 12);
          }
        }
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

  console.log('Saved transparent pouch:', outputPath);
}

async function run() {
  await removeBackground(
    'public/assets/baithak_pouch_front.jpg',
    'public/assets/baithak_pouch_front_transparent.png'
  );
  await removeBackground(
    'public/assets/baithak_pouch_back.jpg',
    'public/assets/baithak_pouch_back_transparent.png'
  );
}

run();
