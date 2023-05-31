export function cuttingString(str) {
  const text = str.slice(0, 100);
  const a = text.split(' ');
  a.splice(a.length - 1, 1);
  const res = a.join(' ');
  return `${res}...`;
}
