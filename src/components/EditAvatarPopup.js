import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const [avatar, setAvatar] = useState('');

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        props.onUpdateAvatar({
          avatar: avatar
        });
    } 
  
    return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name="edit-avatar" heading="Обновить аватар" saveButtonValue="Сохранить" >
        <input onChange={handleAvatarChange} className="popup__input popup__input_value_avatar" type="url" name="avatar" id="avatar" placeholder="Ссылка на изображение" required/>
        <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
    );
}

export default EditAvatarPopup;