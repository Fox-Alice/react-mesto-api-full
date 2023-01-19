import { useState, useContext, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ active, onClose, onUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about)
    }, [currentUser])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            active={active}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
            name="edit"
            title="Редактировать профиль">
            <fieldset className="popup__border">
                <input
                    defaultValue={name}
                    onChange={handleChangeName}
                    id="name-input"
                    type="text"
                    name="name"
                    className="popup__form-item popup__form-item_type_name"
                    placeholder="Имя"
                    minLength={2}
                    maxLength={40}
                    required=""
                />
                <span
                    id="name-input-error"
                    className="name-input-error popup__input-error"
                >
                    ошибка
                </span>
                <input
                    defaultValue={description}
                    onChange={handleChangeDescription}
                    id="job-input"
                    type="text"
                    name="description"
                    className="popup__form-item popup__form-item_type_job"
                    placeholder="О себе"
                    minLength={2}
                    maxLength={200}
                    required=""
                />
                <span
                    id="job-input-error"
                    className="job-input-error popup__input-error"
                />
            </fieldset>
        </PopupWithForm>
    )
}
export default EditProfilePopup;