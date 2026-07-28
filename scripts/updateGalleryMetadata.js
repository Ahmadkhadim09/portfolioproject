const fs = require('fs').promises;
const path = require('path');
const exifr = require('exifr');

const repoRoot = path.resolve(__dirname, '..');
const galleryDir = path.join(repoRoot, 'public', 'images', 'gallery');
const dataFile = path.join(repoRoot, 'src', 'data', 'galleryData.ts');

// Numbers to permanently delete (from user's request)
const deleteNumbers = [104,107,112,111,89,80,78,76,69,61,24];

(async () => {
  try {
    const files = await fs.readdir(galleryDir);
    const imageFiles = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f));

    const deleted = [];
    // Delete matching files if present
    for (const n of deleteNumbers) {
      const prefix = String(n).padStart(6, '0');
      const match = imageFiles.find(f => f.startsWith(prefix));
      if (match) {
        const full = path.join(galleryDir, match);
        await fs.unlink(full);
        deleted.push(match);
        // remove from imageFiles list
        const idx = imageFiles.indexOf(match);
        if (idx !== -1) imageFiles.splice(idx, 1);
      }
    }

    console.log('Deleted files:', deleted);

    const out = [];
    for (const [i, file] of imageFiles.entries()) {
      const full = path.join(galleryDir, file);
      let location = '';
      try {
        const exif = await exifr.parse(full, { tiff: true, ifd0: true, exif: true, gps: true, iptc: true });
        if (exif) {
          if (exif.latitude && exif.longitude) {
            location = `${Number(exif.latitude).toFixed(6)},${Number(exif.longitude).toFixed(6)}`;
          } else if (exif.City) {
            location = exif.City;
          } else if (exif.Location) {
            location = exif.Location;
          } else if (exif.ImageDescription) {
            location = exif.ImageDescription;
          } else if (exif.ObjectName) {
            location = exif.ObjectName;
          } else if (exif.Country) {
            location = exif.Country;
          }
        }
      } catch (e) {
        console.warn('EXIF read failed for', file, e.message || e);
      }

      out.push({
        src: `/images/gallery/${file}`,
        title: `Gallery Image ${i + 1}`,
        description: '',
        alt: `Gallery image ${i + 1}`,
        location,
      });
    }

    // Write TS file
    const header = `export type GalleryData = { src: string; title: string; description: string; alt: string; location: string };

`;
    const body = `export const galleryData: GalleryData[] = ${JSON.stringify(out, null, 2)};
`;
    await fs.writeFile(dataFile, header + body, 'utf8');

    console.log(`Wrote ${out.length} entries to ${dataFile}`);
    if (deleted.length) console.log('Permanently deleted files:', deleted.join(', '));
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
