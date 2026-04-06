var formularios = document.getElementsByClassName('formulario');
var inputs = document.querySelectorAll('.inPut');

var login_form = formularios[0];
var reg_form = formularios[1];
var reset_form = formularios[2];

window.onload = function Main() {

    checkSession();
    eventsListeners();
}


function checkSession() {

    if (sessionStorage.getItem('SessionEmail') && sessionStorage.getItem('SessionID')) {
        location.href = 'page2.html';
    }
}


function eventsListeners() {

    login_form.addEventListener('submit', function (e) {
        e.preventDefault();
        eventLogin();
    });

    reg_form.addEventListener('submit', function (e) {
        e.preventDefault();
        eventRegister();
    });

    reset_form.addEventListener('submit', function (e) {
        e.preventDefault();
        eventResetEmail();
    });

};



function eventResetEmail() {

    var emailFromReset = inputs[6];

    verifyEmail(emailFromReset, 6);

    if (verifyEmail(emailFromReset, 6)) {
        alert("Service not available yet");
    } else {
        
    }
    
}



function eventRegister() {

    var userNameFromRegister = inputs[2];
    var emailFromRegister = inputs[3];
    var passwordFromRegister = inputs[4];
    var passwordRepeatFromRegister = inputs[5];

    verifyUserName(userNameFromRegister, 2)
    verifyEmail(emailFromRegister, 3);
    verifyPassword(passwordFromRegister, 4)
    verify2ndPassword(passwordRepeatFromRegister, passwordFromRegister, 5)

    if (verifyUserName(userNameFromRegister, 2) && verifyEmail(emailFromRegister, 3) && verifyPassword(passwordFromRegister, 4) && verify2ndPassword(passwordRepeatFromRegister, passwordFromRegister, 5)) {

        var datos = new FormData(reg_form);

        console.log(datos);
        console.log(datos.get('email'));
        console.log(datos.get('password'));

        fetch('services/registerNewUser.php', {
            method: 'POST',
            body: datos
        })

            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data === 'error1') {
                    invalidInputHandler(inputs[3], "Existing account", 3);

                }else {
                    validInputHandler(inputs[2], 2);
                    validInputHandler(inputs[3], 3);
                    validInputHandler(inputs[4], 4);
                    validInputHandler(inputs[5], 5);

                    reg_form.reset();
                    alert("Account created Successfully! :)")
                    location.href = 'index.html';

                }
            });

    } else {
        console.warn('Else in eventRegister!!');
    }
}



function eventLogin() {

    var emailFromLogin = inputs[0];
    var passwordFromLogin = inputs[1];

    verifyEmail(emailFromLogin, 0);
    verifyPassword(passwordFromLogin, 1);

    if (verifyEmail(emailFromLogin, 0) && verifyPassword(passwordFromLogin, 1)) {

        var datos = new FormData(login_form);

        // console.log(datos);
        // console.log(datos.get('email'));
        // console.log(datos.get('password'));

        fetch('services/login.php', {
            method: 'POST',
            body: datos
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data === 'error1') {
                invalidInputHandler(inputs[0], "Email does not exist", 0);
            }

            if (data === 'error2') {
                invalidInputHandler(inputs[1], "Password incorrect", 1);
            }

            if (data != 'error1' && data != 'error2') {
                validInputHandler(inputs[0], 0);
                validInputHandler(inputs[1], 1);
                sessionStorage.setItem('SessionEmail', data['Email']);
                sessionStorage.setItem('SessionID', data['UserID']);
                sessionStorage.setItem('SessionUser', data['Username']);

                location.href = 'page2.html';

            }
        });

    } else {
        console.warn('Fields empty!');
    }

}


//*** Checkers  ***/

function verifyEmail(emailInput, indexOfElement) {
    if (!checkIfEmpty(emailInput, indexOfElement)) { //check is not empty.
    }else if(!checkInputLength(emailInput, indexOfElement, 2, 50)){
    } else if (!checkValidEmailFormat(emailInput, indexOfElement)) { //check if an email is valid.
    } else {
        return true
    }
}


function verifyPassword(passwordInput, indexOfElement) {
    if (!checkIfEmpty(passwordInput, indexOfElement)) { //check is not empty. 
    } else if (!checkInputLength(passwordInput, indexOfElement, 8, 50)) { //check length of input
    } else {
        return true
    }
}


function verify2ndPassword(passwordInput, comparingPasswordValue, indexOfElement) {
    if (!checkIfEmpty(passwordInput, indexOfElement)) { //check is not empty. 
    } else if (!checkInputLength(passwordInput, indexOfElement, 8, 50)) { //check length of input
    } else if(!checkInputsMatch(passwordInput, comparingPasswordValue, indexOfElement)){
    }else{
        return true
    }
}


function verifyUserName(userNameInput, indexOfElement){
    if (!checkIfEmpty(userNameInput, indexOfElement)) { //check is not empty. 
    }else if(!checkInputLength(userNameInput, indexOfElement, 2, 25)){
    } else {
        return true
    }
}


//*** START OF THE TOOLS DEVELOPED TO HANDLE THE INPUTS FUNCTIONS ***/

function checkIfEmpty(inputValue, indexOfElement) {
    var errorMsg = "This field cannot be blank";
    var checkTrim = inputValue.value.trim();

    if (checkTrim == '') {
        invalidInputHandler(inputValue, errorMsg, indexOfElement);
        return false;
    } else {
        validInputHandler(inputValue, indexOfElement);
        return true;
    }
}


function checkValidEmailFormat(inputValue, indexOfElement) {
    var errorMsg = "Not a valid email";

    if (!emailFormat(inputValue.value)) {
        invalidInputHandler(inputValue, errorMsg, indexOfElement);
        return false;
    } else {
        validInputHandler(inputValue, indexOfElement);
        return true;
    }
}


function emailFormat(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


function checkInputLength(inputValue, indexOfElement, minLength, maxLength) {
    var errorMsg = "Length (min "+minLength+" - max "+maxLength+")";
    var inputVal = inputValue.value.trim();

    if (inputVal.length < minLength || inputVal.length > maxLength) {
        invalidInputHandler(inputValue, errorMsg, indexOfElement);
        return false;
    } else {
        validInputHandler(inputValue, indexOfElement);
        return true;
    }
}


function checkInputsMatch(inputValue, comparingValue, indexOfElement){
    var errorMsg = "Must match";

    if (inputValue.value != comparingValue.value) {
        invalidInputHandler(inputValue, errorMsg, indexOfElement);
        return false;
    } else {
        validInputHandler(inputValue, indexOfElement);
        return true;
    }
}


function validInputHandler(inputValue, indexOfElement) {
    inputValue.style.borderBottomColor = "#19C12C"; //Set bottom border GREEN.

    var errorMessage = document.querySelectorAll('.errorMsg');
    errorMessage[indexOfElement].style.visibility = 'hidden';
}


function invalidInputHandler(inputValue, errorMsg, indexOfElement) {
    inputValue.style.borderBottomColor = "#e74c3c"; //Set bottom border RED.

    var errorMessage = document.querySelectorAll('.errorMsg');
    errorMessage[indexOfElement].style.visibility = 'visible';
    errorMessage[indexOfElement].textContent = errorMsg;
}
