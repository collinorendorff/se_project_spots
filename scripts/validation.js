// Declaring a configuration object that contains the
// necessary classes and selectors. 
const selectors = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

//makes visible (by adding text) an error <span> element corresponding to a specific field
//and gives it the browser-provided error message to display
function showInputError(formElement, inputElement, message, selectors) {
    const errorSpanId = "#" + inputElement.id + "-error";
    const errorSpanElement = formElement.querySelector(errorSpanId);
    errorSpanElement.textContent = message;
    errorSpanElement.classList.add(selectors.errorClass);
    inputElement.classList.add(selectors.inputErrorClass);
}

//makes invisible (by clearing text) an error <span> element corresponding to a specific field
function hideInputError(formElement, inputElement, selectors) {
    const errorSpanId = "#" + inputElement.id + "-error";
    const errorSpanElement = formElement.querySelector(errorSpanId);
    errorSpanElement.textContent = "";
    errorSpanElement.classList.remove(selectors.errorClass);
    inputElement.classList.remove(selectors.inputErrorClass);
}

//checks if specific input field has status of "valid" and accordingly hides or shows it
function checkInputValidity(formElement, inputElement, selectors) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
}

//checks if at least one input field in array of input fields is "invalid"
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

//wrote below enable and disable functions so that they can also be reused in index.js
function disableButton(buttonElement, selectors) {
    buttonElement.disabled = true;
    buttonElement.classList.add(selectors.inactiveButtonClass);
}

function enableButton(buttonElement, selectors) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectors.inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement, selectors) {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, selectors);
    } else {
        enableButton(buttonElement, selectors);
    }
}

//iterates through inputs in each field and gives them event listeners to perform validation
function setEventListeners(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, selectors);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        });
    });
}

//calls setEventListeners on all modal__form elements
function enableValidation(selectors) {
    const formList = document.querySelectorAll(selectors.formSelector);
    formList.forEach(formElement => {
        setEventListeners(formElement, selectors);
    });
}

//runs nested validation functions
enableValidation(selectors);