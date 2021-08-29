import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import InfoTooltip from './InfoTooltip.js';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import {AuthContext} from '../contexts/AuthContext';
import auth from '../utils/Auth';

function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [emailData, setEmailData] = useState('')
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [cards, setCards] = useState([])
    const {isLoggedIn, setupLoggedIn} = useContext(AuthContext)
    const history = useHistory()
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false)

      useEffect( () => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([ userData, cards ]) => { 
            setCurrentUser(userData)
            setCards(cards)  
        })
        .catch((err) => {
            console.log(err);
          }); 
      }, [] )

      useEffect( () => {
        tokenCheck()
      }, [] )

      function tokenCheck () {
        const token = localStorage.getItem('jwt')

        if (token){
          auth.authorization(token)
          .then( (res) => {
              if(res){
                setupLoggedIn(true)
                history.push('/')
                setEmailData(res.data.email)
              }
          })
          .catch((err) => console.log(err))
        }
      } 

      function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.like(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => 
              c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
          });;
    }
    
    function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
        // console.log(newCard)
          setCards((cards) => [...cards].filter(c => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
        setIsInfoTooltipOpen(false)
    }

    function handleUpdateUser(userInfo) {
        api.updateUserInfo(userInfo)
        .then((userInfo) => {
            setCurrentUser(userInfo)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar)
        .then((avatar) => {
            setCurrentUser(avatar)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlace (newCard) {
        api.postCard(newCard)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err);
          });
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
            setupLoggedIn(false)
            history.push('/sign-in')
    }

    function handleRegister({password, email}) {
        auth.register(password, email)
        .then(() => {
            history.push('/sign-in')
            setIsInfoTooltipSuccess(true)
        })
        .catch((err) => {
            setIsInfoTooltipSuccess(false);
            history.push('/sign-up')
            console.log(err)
        })
        .finally(() => {
            setIsInfoTooltipOpen(true);
          });
    }

    function handleLogin({password, email}) {
        auth.login(password, email)
        .then((res) => {
            if (res.token){
                localStorage.setItem('jwt', res.token)
                setEmailData(email)
                setupLoggedIn(true)
                history.push('/');
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <div className="page__container">
                <Header email={emailData} onSignOut={handleSignOut}/>

                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister}/>
                    </Route>

                    <Route path="/sign-in">
                        <Login onLogin={handleLogin}/>
                    </Route>

                    <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
                        <Main 
                            onCardClick={handleCardClick} 
                            onEditProfile={handleEditProfileClick} 
                            onAddPlace={handleAddPlaceClick} 
                            onEditAvatar={handleEditAvatarClick} 
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete} />

                        
                    </ProtectedRoute>
                </Switch>

                <EditProfilePopup 
                    onUpdateUser={handleUpdateUser} 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} />

                <AddPlacePopup 
                    onAddPlace={handleAddPlace} 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups}/>

                <PopupWithForm name="confirm" heading="Вы уверены?" saveButtonValue="Сохранить" />

                <EditAvatarPopup 
                    onUpdateAvatar={handleUpdateAvatar} 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <InfoTooltip 
                    isOpen={isInfoTooltipOpen}
                    isSuccess={isInfoTooltipSuccess}
                    onClose={closeAllPopups}
                />
                <Footer />
            </div>

        </div>
    </CurrentUserContext.Provider>
);
}

export default App;
