import React from 'react'
import success from '../images/success.png';
import fail from '../images/fail.png';


function InfoTooltip({ active, onClose, loggedIn, message }) {

    return (
        <div className={`page popup tooltip-popup ${active && 'popup_opened'}`}>
            <div className="tooltip-popup__container popup__container">
                <button
                    onClick={onClose}
                    className="tooltip-popup__close-icon popup__close-icon"
                    aria-label="close"
                    type="button"
                />
                <div>
                    <img
                        className="tooltip-popup__image"
                        src={loggedIn ? success : fail}
                        alt="Success"
                    />
                    <p className="tooltip-popup__title popup__title">{message ? message : 'Ошибка'}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;