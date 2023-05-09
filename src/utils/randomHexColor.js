export const randomHexColor = () => {
  let r = Math.floor(Math.random() * 255).toString(16);
  let g = Math.floor(Math.random() * 255).toString(16);
  let b = Math.floor(Math.random() * 255).toString(16);
  r = r.length === 1 ? '0' + r : r;
  g = g.length === 1 ? '0' + g : g;
  b = b.length === 1 ? '0' + b : b;
  return '#' + r + g + b;
};