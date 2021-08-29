import React from 'react';

function PopupWithForm(props) {

  return (
    <section onSubmit={props.onSubmit} className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
            <h2 className="popup__heading">{props.heading}</h2>
            <form className="popup__form popup__form_edit" name={props.name} method="post" noValidate>
                {props.children}
                <input className="popup__button popup__save-button" type="submit" value={props.saveButtonValue}/>
            </form>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
        </div>   
    </section>
  );
}

export default PopupWithForm;