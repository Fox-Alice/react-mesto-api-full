export const validationConfig = {
    formElementSelector: '.popup__form',
    formInputSelector: '.popup__form-item',
    buttonElementSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__input-error_active'
}

export const apiConfig = {
    url: "https://mesto.nomoreparties.co./v1/cohort-51",
    headers: {
        authorization: '31e7088a-3b9d-4de6-85fd-70c9c1c04334',
        'Content-Type': 'application/json'
    }
}