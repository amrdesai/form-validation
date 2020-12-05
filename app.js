const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// FUNCTIONS
// Function: Show input error message
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

// Function: Show input successs
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

// Function: Check if valid email address
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `Email is not valid`);
    }
};

// Function: extract field name
const getFieldName = (input) =>
    input.id.charAt(0).toUpperCase() + input.id.slice(1);

// Function: Check required fields
const checkRequired = (inputArr) => {
    inputArr.forEach((currentInput) => {
        if (currentInput.value.trim() === '') {
            showError(
                currentInput,
                `${getFieldName(currentInput)} is required`
            );
        } else {
            showSuccess(currentInput);
        }
    });
};

// Function: Check input length
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at lease ${min} charactors`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be at less than ${max} charactors`
        );
    } else {
        showSuccess(input);
    }
};

// Function: Password match check
const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
};

// EVENT LISTENERS
// Form submit event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 16);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
