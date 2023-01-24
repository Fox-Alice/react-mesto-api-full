import { useContext } from 'react';
import cardRemoveButton from '../images/card-remove-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ item, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = item?.owner === currentUser?._id;
    const cardDeleteButtonClassName = (
        `card__remove-button ${isOwn ? 'card__remove-button_visible' : ' '}`
    );

    const isLiked = item?.likes?.some(id => id === currentUser?._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : 'card__like'}`
    );;

    function handleClick() {
        onCardClick(item);
    }

    function handleLikeClick() {
        onCardLike(item)
    }

    function handleDeleteClick() {
        onCardDelete(item)
    }

    return (
        <div className="card">
            <button className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
                aria-label="remove"
                type="button">
                <img
                    className="card__remove-image"
                    src={cardRemoveButton}
                    alt="кнопка удалить"
                />
            </button>
            <img
                onClick={handleClick}
                className="card__image"
                src={item?.link}
                alt={item?.name}
            />
            <div className="card__caption">
                <h2 className="card__title">{item?.name}</h2>
                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="like" type="button" />
                    <span className="card__like-counter">{item?.likes?.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;