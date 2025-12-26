const helperFunction = {}

helperFunction.isEmpty = (val) => {
  if (val == null) return true;
  if (Array.isArray(val)) return !val.length;
  if (typeof val === 'object') return !Object.keys(val).length;
  return false;
};

module.exports = helperFunction