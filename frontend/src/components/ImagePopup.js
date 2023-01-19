import React from 'react'

function ImagePopup(props) {

    return (
        <div className={`image-popup popup ${props?.item && 'popup_opened'}`}>
            <div className="image-popup__container">
                <button
                    onClick={props?.onClose}
                    className="image-popup__close-icon popup__close-icon"
                    aria-label="close"
                    type="button"
                />
                <div>
                    <img
                        className="image-popup__image"
                        src={props?.item?.link}
                        alt={props?.item?.name}
                    />
                    <p className="image-popup__caption">{props?.item?.name}</p>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;