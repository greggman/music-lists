const numTracks = 3;

const numPerSlice = 50;

export default async function getRandomMusic() {
  const id = numTracks * Math.random() | 0;
  const sliceId = (id / numPerSlice | 0).toString().padStart(5, '0');
  const parts = /^(\d+)(\d)(\d)(\d)(\d)$/.exec(sliceId).slice(1);
  parts.pop();
  const file = `list.json`;
  const filename = ['tracks', ...parts, file].join('/');
  const url = new URL(filename, import.meta.url);
  const res = await fetch(url.href);
  const slice = await res.json();
  const data = slice[id % numPerSlice];
  data.trackUrl = new URL(data.trackUrl, import.meta.url).href;
  return data;
}