export const validationConfig = {
    formElementSelector: '.popup__form',
    formInputSelector: '.popup__form-item',
    buttonElementSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__input-error_active'
}

export const apiConfig = {
    url: "https://api.foxalice.nomoredomains.rocks",

    headers: {
        'Content-Type': 'application/json'
    }
}