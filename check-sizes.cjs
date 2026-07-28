const fs = require('fs');
const gallery = fs.readFileSync('src/data/galleryData.ts', 'utf8');
const lines = gallery.match(/const filenames = \[([\s\S]*?)\];/)[1].split('\n').filter(l => l.includes('"'));
const filenames = lines.map(l => l.match(/"([^"]+)"/)[1]);

[20, 21, 22, 23, 24, 25].forEach(i => {
    const f = filenames[i];
    if (f) {
        try {
            const stat = fs.statSync('public/images/gallery/' + f);
            console.log(`Index ${i} (${f}) size: ${stat.size}`);
        } catch (e) {
            console.log(`Index ${i} error: ${e.message}`);
        }
    }
});
