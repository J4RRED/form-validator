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

const validEmail = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (re.test(email.value.trim())) { // test is a function of regular expressions to see if they match a string
        showSuccess(email);
    } else {
       showError(email, 'Invalid email');
    }
}

const errorName = (err) => {
    if (err.id == 'passwordConfirm') {
        return 'Password Confirmation'
    }
    return err.id.charAt(0).toUpperCase() + err.id.slice(1);
}

const isValid = (arr) => {
    arr.forEach(element => {
        if (element.value.trim() =='') {
            showError(element, `${errorName(element)} is required`);
        } else {
            showSuccess(element)
        }
    });
}

const checkLen = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${errorName(input)} must be at least ${min} characters long. You need ${min - input.value.length} more.`);
    } else if (input.value.length > max) {
        showError(input, `${errorName(input)} must be less than ${max} characters long. You need ${Math.abs(max - input.value.length)} less.`);
    } else {
        showSuccess(input);
    }
}

const passMatch = (password, passwordConfirm) => {
    if (password.value !== passwordConfirm.value) {
        showError(passwordConfirm, 'Please enter a matching password')
    }
    if (password.value.match(/[a-z]/) && password.value.match(/[A-Z]/) && password.value.match(/\d/) && password.value.match(/[^a-zA-Z\d]/)) {
        showSuccess(password)
    } else {
        console.log('make it stronger!')
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    validEmail(email);
})

form.addEventListener('input', e => {
    isValid([username, password, passwordConfirm]);
    checkLen(username, 5, 15);
    checkLen(password, 8, 25);
    passMatch(password, passwordConfirm);
})