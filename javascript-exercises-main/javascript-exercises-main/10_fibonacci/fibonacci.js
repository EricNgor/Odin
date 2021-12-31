const fibonacci = function(n) {
  const fib = (n, a, b) => {
    if (n === 0) return a;
    return fib(n-1, a+b, a);
  }
  const val = parseInt(n);
  if (!isNaN(val)) {
    if (val < 0) return 'OOPS';
    return fib(n, 0, 1);
  } else {
    return 'OOPS';
  }
};

// Do not edit below this line
module.exports = fibonacci;
