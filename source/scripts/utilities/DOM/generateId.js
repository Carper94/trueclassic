const defaultConfig = {
  prepend: '',
  length: '4',
};

const randcharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const randchars = ((R, M) => {
  const L = R.length;
  const r = M.random;
  const f = M.floor;
  return (len) => {
    let i;
    let s = '';
    for (i = 0; i < len; i += 1) s += R[f(r() * L)];
    return s;
  };
})(randcharset.split(''), Math);

const buildId = (config) => {
  return config.prepend + randchars(config.length);
};

const generateId = () => {
  return (options = {}) => {
    const config = { ...defaultConfig, ...options };
    let isUnique = false;
    let uniqueId = buildId(config);

    do {
      uniqueId = buildId(config);
      isUnique = !document.getElementById(uniqueId);
    } while (!isUnique);

    return uniqueId;
  };
};

export default generateId();
