function getMinMax(str) {
  const result = str.split(' ').filter((element) => isFinite(element));
  const min = result.reduce((a, b) => Math.min(a, b));  
  const max = result.reduce((a, b) => Math.max(a, b));
  return { min, max };
}