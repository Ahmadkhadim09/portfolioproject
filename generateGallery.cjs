const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public/images/gallery');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

const titles = [
    'Modern Living', 'Urban Luxury', 'Elegant Design', 'Creative Space',
    'Timeless Beauty', 'Coastal Escape', 'Infinite Vision', 'Dynamic Form',
    'Abstract Concept', 'Pure Elegance'
];
const descs = [
    'Exquisite modern aesthetic', 'Premium architectural design',
    'Captivating visual experience', 'Harmony in structure',
    'Refined contemporary style', 'Bold and visionary form'
];

const imgs = files.map((f, i) => ({
    src: '/images/gallery/' + f,
    title: titles[i % titles.length],
    description: descs[i % descs.length],
    alt: 'Gallery capture ' + i
}));

const content = [
    "export type GalleryData = { src: string; title: string; description: string; alt: string; };",
    "export const galleryData: GalleryData[] = " + JSON.stringify(imgs, null, 2) + ";"
].join('\n\n');

const outDir = path.join(process.cwd(), 'src/data');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}
fs.writeFileSync(path.join(outDir, 'galleryData.ts'), content);
console.log('Done generating galleryData');
