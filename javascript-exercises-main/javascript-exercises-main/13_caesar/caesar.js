const caesar = function(str, shift) {
  let res = '';

  for (const char of str) {
    let start, end;

    if (char.match(/[A-Z]/)) {
      start = 'A'; end = 'Z';
    } else if (char.match(/[a-z]/)) {
      start = 'a'; end = 'z';
    }

    if (start && end) {
    const code = char.charCodeAt(0);
    let nextCode = code + shift;
    while (nextCode < start.charCodeAt(0)) nextCode += 26;
    while (nextCode > end.charCodeAt(0))   nextCode -= 26;
    res += String.fromCharCode(nextCode);
    } else {
      res += char;
    }
  }
  return res;
};

// Do not edit below this line
module.exports = caesar;
