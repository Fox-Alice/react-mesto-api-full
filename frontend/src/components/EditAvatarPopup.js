import React from 'react';
import { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ active, onClose, onUpdateAvatar }) {

    const avatarInput = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInput.current.value,
        });
    }

    useEffect(() => {
        avatarInput.current.value = ' ';
    }, [active]);


    return (
        <PopupWithForm
            active={active}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
            name="avatar"
            title="Обновить аватар">
            <fieldset className="popup__border avatar-popup__border">
                <input
                    ref={avatarInput}
                    id="avatar-input"
                    type="url"
                    name="avatar"
                    className="popup__form-item avatar-popup__form-item popup__form-item_type_link"
                    placeholder="Ссылка на изображение"
                    required=""
                />
                <span
                    id="avatar-input-error"
                    className="avatar-input-error popup__input-error"
                />
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;