import fs from 'fs';
import path from 'path';

const rootPath = 'tracks'

const filenames = fs.readdirSync(rootPath, {recursive: true})
  .filter(f => (f.includes('/') || f.includes('\\')) &&
                f.endsWith('.json') &&
                !f.endsWith('/list.json') &&
                path.basename(f).length > 6)
  .map(f => f.replaceAll('\\', '/'))

const byLeaf = new Map();
for (const f of filenames) {
  const leaf = f.substring(0, 7);
  const leaves = byLeaf.get(leaf) || [];
  byLeaf.set(leaf, leaves);
  leaves.push(f);
}

let total = 0;
for (const [leaf, leaves] of byLeaf.entries()) {
  total += leaves.length;
  if (leaves.length > 50) {
    console.error(`more than 50 songs in: tracks/${leaf}`);
    process.exit(1);
  }
  leaves.sort();
  const tracks = [];
  for (const track of leaves) {
    const data = JSON.parse(fs.readFileSync(path.join(rootPath, track), {encoding: 'utf-8'}));
    const ext = path.extname(track);
    const name = path.basename(track, ext);
    data.name = data.name || name;
    data.trackUrl = `${rootPath}/${path.dirname(track)}/${name}.mp3`;
    tracks.push(data);
  }
  const outName = path.join(rootPath, leaf, 'list.json');
  console.log('write:', outName);
  fs.writeFileSync(outName, JSON.stringify(tracks, null, 2));
}

const jsFilename = 'get-random-music.js';
const js = fs.readFileSync(jsFilename, {encoding: 'utf8'});
const newJs = js.replace(/numTracks = \d+/, `numTracks = ${total}`);
fs.writeFileSync(jsFilename, newJs);
