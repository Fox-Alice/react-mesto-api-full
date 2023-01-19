import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card'

function Main({ cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img
                        className="profile__avatar"
                        src={currentUser?.avatar}
                        alt="Аватар путешественника"
                    />
                    <div onClick={onEditAvatar} className="profile__avatar-overlay" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser?.name}</h1>
                    <button onClick={onEditProfile} className="profile__button" aria-label="edit" type="button" />
                    <p className="profile__description">{currentUser?.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" aria-label="add" type="button" />
            </section>
            <section className="photo-grid">
                {cards.map((item) => (
                    <Card
                        item={item}
                        likes={item.likes}
                        name={item.name}
                        key={item._id}
                        link={item.link}
                        owner={item.owner}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;