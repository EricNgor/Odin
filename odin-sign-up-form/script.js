const inputs = document.querySelectorAll('.field input');

inputs.forEach((el) => {
  el.addEventListener('input', ({target}) => {
    const field = target.parentElement;
    if (target.value.length !== 0) {
      field.classList.add('not-empty');
    } 
    else {
      field.classList.remove('not-empty');
    }
  });
});

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

function validatePassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords don't match!");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirmPassword.onchange = validatePassword;