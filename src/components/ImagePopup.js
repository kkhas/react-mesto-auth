import React from 'react';

function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.card ? 'popup_active' : ''}`}>
        <figure className="popup__image-container">
            <img className="popup__image" src={`${props.card ? props.card.link : ''}`} alt={`${props.card ? props.card.name : ''}`}/>
            <figcaption className="popup__image-title">{`${props.card ? props.card.name : ''}`}</figcaption>
            <button onClick={props.onClose} className="popup__close" type="button"></button>
        </figure>
    </section>
  );
}

export default ImagePopup;