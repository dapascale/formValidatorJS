// First, we want to pull in all of the DOM elements we will need: Form, and each input

// DOM ELEMENTS

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// FUNCTIONS

// Error Function | (param1, param2) = (username, 'Username is required') | passed through eventListener function
const showError = (input, message) => {
    // Create a variable to store the element we are grabbing -> the PARENT ELEMENT of the INPUT
    const formControl = input.parentElement;
    // Use vanillaJS to edit the className -> Make sure to include ALL classes you want to be present
    formControl.className = 'formControl error';
    // Create a variable to find (using .querySelector) and store the <small> element
    const small = formControl.querySelector('small');
    // Change the text of this element to the string below, or in our case, the message being passed through as an argument in the eventListener function
    small.innerText = message // <---- 'message' is being passed through the event listener as param2
}


// Success Function | (param1) = (input) | passed through eventListener function
const showSuccess = (input) => {
    // Create a variable to store the element we are grabbing -> the PARENT ELEMENT of the INPUT
    const formControl = input.parentElement;
    // Use vanillaJS to edit the className -> Make sure to include ALL classes you want to be present
    formControl.className = 'formControl success';
}

// Create a function to check the required inputs | We will pass the param through as an array, and then loop through with a forEach
const checkRequired = (inputArr) => {
    inputArr.forEach(function(input) {
        // If the username is an empty string
        // Always good to add .trim() method to help clear whitespace
        if (input.value.trim() === '') {
            // run the showError function passing in the below parameters
            showError(input, `${getInputName(input)} is required, duh!`)
        } else {
            showSuccess(input);
        }
    })
}

// Check Input Length Function
const checkLength = (input, min, max) => {
    // When we run the function below in the eventListener, we will put in the min + max values
    if (input.value.length < min) {
        showError(input, `${getInputName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} must be no greater than ${max} characters`)
    }
}

// Valid Email Function
const checkEmail = (input) => {
    // Regex grabbed from Stack Overflow
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Write a conditional statement
    if (re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Whoops! Your email smells a little funky...')
    }
}

// Check Passwords Match Function
const checkPasswords = (pass1, pass2) => {
    if (pass2.value !== pass1.value) {
        // run the showError function passing in the below parameters
        showError(password2, 'Passwords do not match. Please try again.')
    } else {
        // Run the showSuccess function
        showSuccess(password2)
    }
}

// Store, Display, Capitalize Input Name Function
const getInputName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



// EVENT LISTENERS

// Add an event listener for the form submit
form.addEventListener('submit', function(e) {
    // Prevent the form submit from refreshing the page
    e.preventDefault();
    // Run the checkRequired function
        // [Rather than running it four separate times with each different input name (username, email, etc) passed in, we can send them all through as an array. Just means we will have to run a forEach method inside the checkRequired function to loop through the array. but it's technically drier code.]
    checkRequired([username, email, password, password2]);
    // Run the checkLength function for username and password
    checkLength(username, 4, 20);
    checkLength(password, 6, 20);
    // Run the checkEmail function
    checkEmail(email);
    // Run the checkPasswords function
    checkPasswords(password, password2);
})








// The eventListener function before we cleaned up the code:

// form.addEventListener('submit', function(e) {
//     // Prevent the form submit from refreshing the page
//     e.preventDefault();

//     // USERNAME
//     // If the username is an empty string
//     if (username.value === '') {
//         // run the showError function passing in the below parameters
//         showError(username, 'Username is required')
//     } else {
//         // Run the showSuccess function
//         showSuccess(username)
//     }

//     // EMAIL
//     // If email input is an empty string
//     if (email.value === '') {
//         // run the showError function passing in the below parameters
//         showError(email, 'Email is required')
//     // Or else, if it is not a valid email address | run isValidEmail function with email.value passed as param, and since we are checking if it is not valid, begin with a '!'
//     } else if (!isValidEmail(email.value)) {
//         showError(email, 'Whoops! Your email smells a little funky...')
//     } else {
//         // Run the showSuccess function
//         showSuccess(email)
//     }

//     // PASSWORD1
//     if (password.value === '') {
//         // run the showError function passing in the below parameters
//         showError(password, 'Password is required')
//     } else if (!password.value.length < 7 ) {
//         showError(password, 'Password must contain at least 8, trust!')
//     } else {
//         // Run the showSuccess function
//         showSuccess(password)
//     }

//     // PASSWORD2
//     if (password2.value === password.value) {
//         // run the showError function passing in the below parameters
//         showError(password2, 'Passwords must match')
//     } else {
//         // Run the showSuccess function
//         showSuccess(password2)
//     }
// })