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
    const successText = formControl.querySelector('small');
    successText.innerText = message;
}

const validEmail = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (re.test(email.value.trim())) { // test is a function of regular expressions to see if they match a string
        showSuccess(email, 'Ah, a real email! 📧');
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
            showSuccess(element, 'Perfect! 👍')
        }
    });
}

const checkLen = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${errorName(input)} must be at least ${min} characters long. You need ${min - input.value.length} more.`);
    } else if (input.value.length > max) {
        showError(input, `${errorName(input)} must be less than ${max} characters long. You need ${Math.abs(max - input.value.length)} less.`);
    } else {
        if (input.id == ("password" || "passwordConfirm")) {
            if (input.value.match(/[a-z]/) && input.value.match(/[A-Z]/) && input.value.match(/\d/) && input.value.match(/[^a-zA-Z\d]/)) {
                showSuccess(input, 'Boom! 👍')
            } else {
                showError(input, 'Please make sure you have at least one Capital Letter, one lowercase letter, one number (0-9), and one symbol (e.g. !,@,#)')
            }
        } else {
            showSuccess(input, 'Perfect! 👍');
        }
    }
}

const passMatch = (password, passwordConfirm) => {
    if (password.value !== passwordConfirm.value) {
        showError(passwordConfirm, 'Please enter a matching password')
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault();

    validEmail(email);
    isValid([username, password, passwordConfirm]);
    checkLen(username, 5, 15);
    checkLen(password, 8, 25);
    passMatch(password, passwordConfirm);
})

form.addEventListener('input', e => {
    validEmail(email);
    isValid([username, password, passwordConfirm]);
    checkLen(username, 5, 15);
    checkLen(password, 8, 25);
    passMatch(password, passwordConfirm);
})

console.log('This is just a fun, simple form validation that can be used in any project.  The form would need to be connected to something like Express, so that you can actually create a databsae with the new user\'s information.')