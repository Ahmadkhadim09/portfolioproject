const fs = require('fs');
const files = fs.readdirSync('public/images/gallery');
const gallery = fs.readFileSync('src/data/galleryData.ts', 'utf8');

const m = gallery.match(/const filenames = \[([\s\S]*?)\];/)[1].split('\n').filter(l => l.includes('\"'));
m.forEach((line, i) => {
    const f = line.match(/\"([^\"]+)\"/)[1];
    if (!files.includes(f)) {
        console.log('Index ' + i + ' missing exactly: ' + f);
        const match = files.find(x => x.toLowerCase() === f.toLowerCase());
        if (match) console.log(' -> Found with diff case: ' + match);
    }
});
