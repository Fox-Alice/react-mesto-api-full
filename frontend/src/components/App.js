import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/Auth.js';
import api from '../utils/Api';
import { useEffect, useState, useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(null);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [message, setMessage] = useState(null)

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setselectedCard(null);
    setIsTooltipPopupOpen(false)
  }

  const handleCardLike = (card) => {
    console.log(card.likes);
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.handleLike(card?._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  const handleCardDelete = (card) => {
    const isOwn = card?.owner === currentUser._id;
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

  const cbLogin = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await auth.authorize({ email, password });
      if (!data) {
        throw new Error('Неверное имя или пароль пользователя');
      }
      if (data.token) {
        console.log(data.token);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setUserData(data);
      }
      return data;
    } catch (err) {
      setMessage(err.message);
      setIsTooltipPopupOpen(true);

    } finally {
      setLoading(false);
    }
  }, [])

  const cbRegister = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const data = await auth.register(email, password);
      if (!data) {
        throw new Error('Пользователь не зарегистрирован');
      }
      if (data) {
        cbLogin(email, password);
        setIsTooltipPopupOpen(true);
      }
      return data;
    } catch (res) {
      setMessage(res.error);
      setIsTooltipPopupOpen(true);

    } finally {
      setLoading(false);
    }
  }, [])

  const cbLogout = (() => {
    setLoggedIn(false);
    localStorage.clear();
    setUserData(null);
  })

  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('no token')
      }
      const user = await auth.checkToken(token);
      if (!user) {
        throw new Error('invalid user')
      }
      if (user) {
        setLoggedIn(true);
        setUserData(user);
        setEmail(user.email);
      }
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck()
  }, [tokenCheck]);

  useEffect(() => {
    loggedIn &&
      api.getUser(currentUser)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log('Error', err);
        })
  }, [loggedIn])

  useEffect(() => {
    loggedIn &&
      api.getInitialCards()
        .then((res) => {
          return setCards(res);
        })
        .catch((err) => {
          console.log('Error', err);
        })
  }, [loggedIn])

  if (loading) {
    return '...Loading'
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn}
          onLogout={cbLogout}
          email={email} />
        <Switch>
          <ProtectedRoute exact path="/"
            loggedIn={loggedIn}
            userData={userData}
            component={Main}
            cards={cards}
            onEditProfile={() => setIsEditProfilePopupOpen(true)}
            onAddPlace={() => setIsAddPlacePopupOpen(true)}
            onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
            onCardClick={(data) => setselectedCard(data)}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          >
          </ProtectedRoute>
          <Route path="/signin">
            <Login loggedIn={loggedIn}
              onLogin={cbLogin}
              onTooltip={() => setIsTooltipPopupOpen(true)}
            />
          </Route>
          <Route path="/signup">
            <Register loggedIn={loggedIn}
              onRegister={cbRegister}
              onTooltip={() => setIsTooltipPopupOpen(true)}
            />
          </Route>
        </Switch>
        <Route exact path="*" >
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
        <Footer />
        <InfoTooltip
          active={isTooltipPopupOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
          message={loggedIn ? "Вы успешно зарегистрировались!" : message} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;