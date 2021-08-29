import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
    
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
    } 
  
    return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name="edit-avatar" heading="Обновить аватар" saveButtonValue="Сохранить" >
        <input ref={avatarRef} className="popup__input popup__input_value_avatar" type="url" name="avatar" id="avatar" placeholder="Ссылка на изображение" required/>
        <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
    );
}

export default EditAvatarPopup;