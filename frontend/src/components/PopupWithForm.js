import React from 'react'

function PopupWithForm({ name, active, onClose, title, onSubmit, children, buttonText }) {

    return (
        <div className={`popup ${name}-popup ${active && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    className={`popup__close-icon ${name}-popup__close-icon`}
                    aria-label="close"
                    type="button"
                />
                <h2 className="popup__title">{title}</h2>
                <form
                    onSubmit={onSubmit}
                    className={`popup__form popup__form_type_${name}`}
                    name={`${name}-popup`}
                    noValidate=""
                >
                    {children}
                    <button
                        className="popup__button popup__save-button"
                        aria-label="save"
                        type="submit"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;