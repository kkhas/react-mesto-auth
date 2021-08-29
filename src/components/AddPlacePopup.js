import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [props.isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    
    props.onAddPlace({
        name: nameRef.current.value,
        link: linkRef.current.value
    })
  }

  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} isOpen={props.isOpen} onClose={props.onClose} name="new-place" heading="Новое место" saveButtonValue="Создать" >
        <input ref={nameRef} className="popup__input popup__input_value_heading" type="text" name="name" id="heading" placeholder="Новое место" minLength="2" maxLength="30" required/>
        <span className="popup__error" id="heading-error"></span>
        <input ref={linkRef} className="popup__input popup__input_value_image" type="url" name="link" id="image" placeholder="Ссылка на изображение" required/>
        <span className="popup__error" id="image-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;