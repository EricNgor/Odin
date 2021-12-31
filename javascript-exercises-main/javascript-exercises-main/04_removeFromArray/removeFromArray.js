const removeFromArray = function(arr, ...vals) {
  const s = new Set(vals);
  for (let i=0; i < arr.length; ++i) {
    if (s.has(arr[i])) {
      arr.splice(i, 1);
      --i;
    }
  }
  return arr;
};

// Do not edit below this line
module.exports = removeFromArray;
