const ftoc = function(f) {
  return Math.round(((f-32)/1.8) * 10) / 10;
};

const ctof = function(c) {
  return Math.round((c*1.8+32) * 10) / 10;
};

// Do not edit below this line
module.exports = {
  ftoc,
  ctof
};
