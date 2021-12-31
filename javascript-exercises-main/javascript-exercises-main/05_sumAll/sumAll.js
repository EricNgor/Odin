const sumAll = function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 'ERROR';
  }
  if (a < 0 || b < 0) return 'ERROR';
  if (a === b) return a;

  let sum = 0;
  let start = a < b ? a : b;
  let end = a > b ? a : b;

  for (let i=start; i <= end; ++i) {
    sum += i;
  }
  return sum;
};


// Do not edit below this line
module.exports = sumAll;
