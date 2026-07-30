import fs from 'fs/promises';
import path from 'path';

const repoRoot = path.resolve(__dirname, '..');
const galleryDir = path.join(repoRoot, 'public', 'images', 'gallery');
const dataFile = path.join(repoRoot, 'src', 'data', 'galleryData.ts');

// Numbers to permanently delete (from user's request)
const deleteNumbers = [104, 107, 112, 111, 89, 80, 78, 76, 69, 61, 24];

async function loadExif() {
  try {
    return await import('exifr');
  } catch {
    return null;
  }
}

function galleryImageSrc(path) {
  return path.includes('?v=') ? path : `${path}?v=20260729`;
}

function formatItem(item) {
  return `  {
    src: galleryImageSrc("${item.src}"),
    title: "${item.title}",
    description: "${item.description}",
    alt: "${item.alt}",
    location: "${item.location}",
  },`;
}

(async () => {
  try {
    const files = await fs.readdir(galleryDir);
    const imageFiles = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();

    const deleted = [];
    for (const n of deleteNumbers) {
      const prefix = String(n).padStart(6, '0');
      const match = imageFiles.find((f) => f.startsWith(prefix));
      if (match) {
        const full = path.join(galleryDir, match);
        await fs.unlink(full);
        deleted.push(match);
        imageFiles.splice(imageFiles.indexOf(match), 1);
      }
    }

    console.log('Deleted files:', deleted);

    const exifr = await loadExif();
    const out = [];

    for (const [i, file] of imageFiles.entries()) {
      const full = path.join(galleryDir, file);
      let location = '';

      if (exifr) {
        try {
          const exif = await exifr.parse(full, {
            tiff: true,
            ifd0: true,
            exif: true,
            gps: true,
            iptc: true,
          });

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
      }

      out.push({
        src: `/images/gallery/${file}`,
        title: `Gallery Image ${i + 1}`,
        description: '',
        alt: `Gallery image ${i + 1}`,
        location,
      });
    }

    const header = [
      'export interface GalleryItem {',
      '  src: string;',
      '  alt: string;',
      '  title: string;',
      '  description: string;',
      '  location: string;',
      '}',
      '',
      'export const galleryVersion = "20260729";',
      '',
      'export function galleryImageSrc(path) {',
      '  return path.includes("?v=") ? path : `${path}?v=${galleryVersion}`;',
      '}',
      '',
    ].join('\n');

    const items = out.map(formatItem).join('\n');
    const body = ['export const galleryData: GalleryItem[] = [', items, '];', ''].join('\n');
    await fs.writeFile(dataFile, header + body, 'utf8');

    console.log(`Wrote ${out.length} entries to ${dataFile}`);
    if (deleted.length) console.log('Permanently deleted files:', deleted.join(', '));
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
