import { useEffect, useContext, useState } from 'react'
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ active, onClose, onAddPlace }) {

    const currentCard = useContext(CurrentCardContext);

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName(currentCard?.name);
        setLink(currentCard?.link)
    }, [currentCard])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [active]);

    return (
        <PopupWithForm
            active={active}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Создать'
            name="card"
            title="Новое место">
            <fieldset className="popup__border card-popup__border">
                <input
                    value={name || ''}
                    onChange={handleChangeName}
                    id="title-input"
                    type="text"
                    name="name"
                    className="popup__form-item card-popup__form-item popup__form-item_type_title"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required=""
                />
                <span
                    id="title-input-error"
                    className="title-input-error popup__input-error"
                />
                <input
                    value={link || ''}
                    onChange={handleChangeLink}
                    id="link-input"
                    type="url"
                    name="link"
                    className="popup__form-item card-popup__form-item popup__form-item_type_link"
                    placeholder="Ссылка на картинку"
                    required=""
                />
                <span
                    id="link-input-error"
                    className="link-input-error popup__input-error"
                />
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;