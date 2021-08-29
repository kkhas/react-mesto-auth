import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card'

function Main({cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
            <button className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} type="button">
                <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
            </button>

            <div className="profile__details">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__subtitle">{currentUser.about}</p>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <button className="profile__add" type="button" onClick={onAddPlace}></button>
        </section>

        <ul className="photo-grid">
          {cards.map((card) => {
            return(
              <Card onCardClick={onCardClick} key={card._id} card={card} onCardDelete={onCardDelete} onCardLike={onCardLike} />
            )
          })}
        </ul>
    
    </main>
  );
}

export default Main;