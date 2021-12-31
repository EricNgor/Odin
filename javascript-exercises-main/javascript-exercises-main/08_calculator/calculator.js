const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
  if (arr.length === 0) return 0;
	return arr.reduce((a, b) => a+b);
};

const multiply = function(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a*b);
};

const power = function(a, b) {
  return Math.pow(a, b);
};

const factorial = function(n) {
  let fac_ = (n, a) => {
    if (n === 0) return a;
    return fac_(n-1, n*a);
  }
  return fac_(n, 1);
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
