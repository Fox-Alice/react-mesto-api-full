import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUser(currentUser)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        return setCards(res);
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setselectedCard(null)
  }

  const handleCardLike = (card) => {
    const isLiked = card?.likes?.some(i => i._id === currentUser._id);
    api.handleLike(card?._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  const handleCardDelete = (card) => {
    const isOwn = card?.owner?._id === currentUser._id;
    api.removeCard(card?._id)
      .then((res) => {
        if (isOwn) {
          setCards((state) => state.filter((c) => c._id !== card._id));
        }
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({
      name: name,
      link: link
    })
      .then((res) => {
        const newCard = res;
        setCards([newCard, ...cards]);;
        closeAllPopups()
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(data) => setselectedCard(data)}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          active={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>
        <AddPlacePopup
          active={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}>
        </AddPlacePopup>
        <EditAvatarPopup
          active={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>
        <PopupWithForm
          buttonText='Да'
          name="delete"
          title="Вы уверены?" />
        <ImagePopup
          item={selectedCard}
          onClose={closeAllPopups} />
        <template className="card-template" />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;