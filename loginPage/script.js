const form = document.querySelector('form');
let username = document.querySelector('#username');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let passwordConfirm = document.querySelector('#passwordConfirm');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const errorText = formControl.querySelector('small');
    errorText.innerText = message;
}

const showSuccess = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    // const successText = formControl.querySelector('small');
    // successText.innerText = message;
}

const errorName = (err) => {
    if (err.id == 'passwordConfirm') {
        return 'Password Confirmation'
    }
    return err.id.charAt(0).toUpperCase() + err.id.slice(1);
}

// would be used to match pass from DB (if there was one)
// const passMatch = (password, passwordConfirm) => {
//     if (password.value !== passwordConfirm.value) {
//         showError(passwordConfirm, 'Please enter a matching password')
//     }
// }

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // passMatch(password, passwordConfirm);
})