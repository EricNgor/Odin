let stack = [];
let stackValue = 0;
let entryValue = 0;
let miscState = '';
let currentOperator = '';
let precision = 0;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 === 0) return 'Cannot divide by zero';
  return num1 / num2;
}
const equals = () => {
  pressButton(document.querySelector('.equals'));

  if (stack.length === 0) return;
  const operator = currentOperator || stack[stack.length-1];
  entryValue = operate(stackValue, entryValue, operator);
  if (typeof entryValue !== 'number') {
    handleError(entryValue);
    return;
  }
  stack = [];
  currentOperator = '';
  miscState = 'done';
  updateDisplay();
}

function operate(num1, num2, operator) {
  let result;

  switch(operator) {
    case 'add':
      result = add(num1, num2); break;
    case 'subtract':
      result = subtract(num1, num2); break;
    case 'multiply':
      result = multiply(num1, num2); break;
    case 'divide':
      result = divide(num1, num2); break;
    default:
      console.error('Error: invalid operator:', operator);
  }

  return result;
}

// Styles element to have highlight effect upon press
function pressButton(element) {
  element.classList.add('selected');
  let interval = setInterval(() => {
    element.classList.remove('selected');
    clearInterval(interval);
  }, 100);
}

const stackDisplay = document.querySelector('.stack');
const entryDisplay = document.querySelector('.entry');

function updateDisplay() {
  if (miscState && miscState !== 'done') {
    entryDisplay.innerHTML = miscState;
    return;
  }
  if (entryValue === 0) {
    entryDisplay.innerHTML = 0;
  } else {
    precision = 15-Math.ceil(Math.log(Math.abs(entryValue))/Math.log(10));
    roundVal = Math.pow(10, precision);
    let valueString = Math.round(entryValue*roundVal)/roundVal + '';
    if (entryValue >= 1000) {
      let startIdx = valueString.length-3;
      let decimalIndex = valueString.indexOf('.');
      startIdx = decimalIndex >= 0 ? decimalIndex-3 : startIdx; 

      for (let i=startIdx; i > 0; i -= 3) {
        valueString = valueString.substring(0, i) + ',' + valueString.substring(i);
      }
    }
    entryDisplay.innerHTML = valueString;
  }

  let stackString = '';
  stack.forEach((item) => {
    switch(item) {
      case 'add':
        item = '+'; break;
      case 'subtract':
        item = '-'; break;
      case 'multiply':
        item = '&times;'; break;
      case 'divide':
        item = '&divide;'; break;
    }
    stackString += item + ' ';
  });

  stackDisplay.innerHTML = stackString;
}

const numbers = document.querySelectorAll('.number');
function pressNumber(value) {
  const numberEl = document.querySelector('.num-'+value);
  pressButton(numberEl);

  // Error or done
  if (miscState) {
    entryValue = parseInt(value);
    if (miscState === 'Cannot divide by zero') {
      enableOperators();
    }
    miscState = '';
    stack = [];
    updateDisplay();
    return;
  }

  // Cannot exceed max entry
  if (entryValue >= Math.pow(10, 12)) return;

  // Decimal at end
  if (entryDisplay.innerHTML[entryDisplay.innerHTML.length-1] === '.') {
    entryValue = parseFloat(entryValue+'.'+value);
    precision = 1;
  } 
  // New entry after operator pressed
  else if (currentOperator) {
    entryValue = parseInt(value); 
  }
  // Append to decimal number
  else if (entryDisplay.innerHTML.indexOf('.') > 0) {
    entryValue = parseFloat(entryValue+''+value);
    ++precision;
  }
  // Replace 0
  else if (entryValue === 0) {
    entryValue = parseInt(value);
  }
  // Default
  else {
    entryValue = parseInt(entryValue+''+value);
  }
  currentOperator = '';
  updateDisplay();
}

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    pressNumber(value);
  });
});

const clearEntryButton = document.querySelector('.clear-entry');
function clearEntry() {
  pressButton(clearEntryButton);
  entryValue = 0;
  currentOperator = '';
  miscState = '';
  precision = 0;
  enableOperators();
  updateDisplay();
}

clearEntryButton.addEventListener('click', (e) => {
  clearEntry();
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', (e) => {
  entryValue = 0; stack = [];
  currentOperator = '';
  miscState = '';
  precision = 0;
  enableOperators();
  updateDisplay();
});

const deleteButton = document.querySelector('.delete');
function deleteLast() {
  pressButton(deleteButton);

  entryString = entryDisplay.innerHTML;
  // Remove commas
  for (let i=0; i < entryString.length; ++i) {
    if (entryString[i] === ',') {
      entryString = entryString.substring(0, i) + entryString.substring(i+1); --i;
    }
  }
  if (entryString.length === 1) {
    if (entryString === '0') return;
    else entryValue = 0;
  } 
  else if (entryString.indexOf('.') >= 0) {
    if (entryString.indexOf('.') === entryString.length-1) {
      entryString = entryString.substring(0, entryString.length-1);
    } else {
      entryString = entryString.substring(0, entryString.length-2);
    }
    entryValue = parseFloat(entryString);
  }
  else {
    entryString = entryString.substring(0, entryString.length-1);
    entryValue = parseInt(entryString);
  }
  updateDisplay();
}

deleteButton.addEventListener('click', (e) => {
  deleteLast();
});

const operators = document.querySelectorAll('.operator');
function pressOperator(operator) {
  const operatorEl = document.querySelector('.'+operator);
  pressButton(operatorEl);

  // Replace current operator
  if (currentOperator && operator !== 'equals') {
    if (operator !== currentOperator) {
      stack[stack.length-1] = operator;
      currentOperator = operator;
      updateDisplay();
      return;
    } else return;
  };

  if (operator === 'equals') {
    equals();
    return;
  } else if (operator === 'invert') {
    entryValue = -entryValue;
    updateDisplay();
    return;
  } else {
    miscState = '';
    const roundVal = Math.pow(10, precision);

    if (stack.length === 0) {
      stackValue = entryValue;
      stack.push(Math.round(entryValue*roundVal)/roundVal, operator);
    } else {
      const op = stack[stack.length-1];
      let result = operate(stackValue, entryValue, op);
      if (typeof result === 'number') {
        stack.push(Math.round(entryValue*roundVal)/roundVal, operator);
        entryValue = result;
        stackValue = result;
      } else {
        handleError(result);
        return;
      }
    }
    currentOperator = operator;
    
    updateDisplay();
  }
}

operators.forEach((operatorElement) => {
  operatorElement.addEventListener('click', (e) => {
    if (operatorElement.classList.contains('disabled')) return;

    const operator = operatorElement.classList[1];
    pressOperator(operator);
  });
});

const decimal = document.querySelector('.decimal');
function pressDecimal() {
  pressButton(decimal);

  if (decimal.classList.contains('disabled')) return;
  let valueString = entryDisplay.innerHTML;

  if (miscState === 'done') {
    entryDisplay.innerHTML = '0.';
    miscState = 0;
    entryValue = 0;
    return;
  }
  
  // Do nothing if there is already a decimal
  if (!currentOperator && valueString.indexOf('.') >= 0) return;

  if (currentOperator) {
    valueString = '0.';
    entryValue = 0;
  } else {
    valueString += '.';
  }

  entryDisplay.innerHTML = valueString;
  miscState = '';
}

decimal.addEventListener('click', (e) => {
  pressDecimal();
});

function handleError(message) {
  miscState = message;
  entryValue = 0;
  if (miscState === 'Cannot divide by zero') {
    disableOperators();
  }
  updateDisplay();
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key.match(/[0-9]/)) pressNumber(parseInt(key));
  else if (key === '+') pressOperator('add');
  else if (key === '-') pressOperator('subtract');
  else if (key === '*') pressOperator('multiply');
  else if (key === '/') pressOperator('divide');
  else if (key === '.') pressDecimal();
  else if (key === 'Backspace') deleteLast();
  else if (key === 'Delete') clearEntry();
  else if (key === '=' || key === 'Enter') equals();
})

function disableOperators() {
  operators.forEach((operator) => operator.classList.add('disabled'));
  decimal.classList.add('disabled');
}
function enableOperators() {
  operators.forEach((operator) => operator.classList.remove('disabled'));
    decimal.classList.remove('disabled');
}