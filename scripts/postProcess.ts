import fs from 'fs';
import path from 'path';

const indexPath = path.join(__dirname, '../gitBuild/index.html');
const gtagPath = path.join(__dirname, '../scripts/gtag.txt');

const index = fs.readFileSync(indexPath, 'utf8');
const gtag = fs.readFileSync(gtagPath, 'utf8');

const indexWithGtag = index.replace('</head>', `\n${gtag}</head>`);

fs.writeFileSync(indexPath, indexWithGtag);
