const palindromes = function (str) {
  let formattedStr = '';
  for (let i=0; i < str.length; ++i) {
    const letter = str[i].toLowerCase();
    if (letter.match(/[a-z]/)) formattedStr += letter;
  }
  let reverseStr = '';
  for (let i=formattedStr.length-1; i >= 0; --i) {
    reverseStr += formattedStr[i];
  }
  return reverseStr === formattedStr;
};

console.log(palindromes('0P'));

// Do not edit below this line
module.exports = palindromes;
