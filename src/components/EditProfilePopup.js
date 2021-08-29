import React, { useEffect, useState} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, props.isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 
  
  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name="edit" heading="Редактировать профиль" saveButtonValue="Сохранить" >
        <input className="popup__input popup__input_value_name" placeholder="Имя" type="text" name="name" id="name" value={name} onChange={handleNameChange} minLength="2" maxLength="40" required/>
        <span className="popup__error" id="name-error"></span>
        <input className="popup__input popup__input_value_title" placeholder="Вид деятельности" type="text" name="about" id="title" value={description} onChange={handleDescriptionChange} minLength="2" maxLength="200" required/>
        <span className="popup__error" id="title-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;