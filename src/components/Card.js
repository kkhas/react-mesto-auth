import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({onCardClick, card, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `photo-grid__delete ${isOwn ? 'photo-grid__delete_visible' : ''}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `photo-grid__like ${isLiked ? 'photo-grid__like-active' : ''}`
  ); 

  function handleClick() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return(
    <li className="photo-grid__item">
      <div onClick={handleClick} className="photo-grid__image" style={{ backgroundImage: `url(${card.link})` }}></div>
      <h2 className="photo-grid__title">{card.name}</h2>
      <div>
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} ></button>
        <p className="photo-grid__like-count">{card.likes.length}</p>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} ></button>
    </li>
  );
}

export default Card;