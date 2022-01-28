const initialSize = 16;
let canvas = document.querySelector('.canvas');

setGrid(initialSize);

let resetButton = document.querySelector('.reset-button');
let resetContainer = document.querySelector('.reset-container');
let resetLabel = document.querySelector('#reset-input-label');
let resetInput = document.querySelector('#reset-input');

resetContainer.appendChild(resetButton);

resetLabel.innerHTML = `${initialSize} x ${initialSize}`;

resetInput.value = initialSize;
resetInput.addEventListener('input', (evt) => {
  const val = resetInput.value;
  resetLabel.innerHTML = `${val} x ${val}`;
});

resetButton.addEventListener('click', (evt) => {
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('filled'));

  setGrid(resetInput.value);
});

function setGrid(size) {
  let prevSize = canvas.children.length;
  if (size < Math.sqrt(prevSize)) {
    while (canvas.children.length > size**2) {
      let node = document.querySelector('.cell');
      canvas.removeChild(node);
    }
  } else if (size > Math.sqrt(prevSize)) {
    let curSize = canvas.children.length;
    for (let i=0; i < (size**2-curSize); ++i) {

      let cell = document.createElement('div');
      cell.classList.add('cell');
      const fillCell = (evt) => {
        evt.preventDefault();
        if (evt.buttons === 1) {
          cell.classList.add('filled');
        }
    
      }
      cell.addEventListener('mouseenter', fillCell);
      cell.addEventListener('mousedown', (evt) => {
        evt.preventDefault();
        cell.classList.add('filled');
      });
      canvas.appendChild(cell);
    }
  }

  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRwos = `repeat(${size}, 1fr)`;
}