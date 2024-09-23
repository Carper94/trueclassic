// add _800x to file image urls
const imgUrl = (url, size) => {
  const { index } = url.match(/\.(png|jpg|jpeg|gif|webp)/);
  if (!index) return url;
  const u = url.slice(0, index);
  const r = size ? `_${size}x` : '';
  const l = url.slice(index);
  return `${u}${r}${l}`;
};

export default imgUrl;
