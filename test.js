const p = document.createElement('p');
p.style.color = 'red';
p.innerText = "Hey I'm red!";
const h3 = document.createElement('h3');
h3.style.color = 'blue';
h3.innerText = "I'm a blue h3!";

const div = document.createElement('div');
div.setAttribute('style', `
  background: pink;
  border: 1px solid black;
`);

const c1 = document.createElement('h1');
c1.innerText = "I'm in a div";
const c2 = document.createElement('p');
c2.innerText = "ME TOO!";
div.appendChild(c1);
div.appendChild(c2);

const body = document.querySelector('body');
body.appendChild(p);
body.appendChild(h3);
body.appendChild(div);