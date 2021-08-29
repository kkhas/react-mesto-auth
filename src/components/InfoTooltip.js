import React from 'react';
import unionSuccess from '../images/Union-success.png';
import unionFail from '../images/Union-error.png';

function InfoTooltip(props) {
  // console.log(props.isSuccess)
  return (
    <section className={`popup ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container popup__container_info">
            <img className="popup__image_info" src={props.isSuccess ? unionSuccess : unionFail} alt={props.isSuccess ? 'Регистрация успешна' : 'Ошибка регистрации'}/>
            <h2 className="popup__heading popup__heading_info">
              {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </h2>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
        </div>   
    </section>
  );
}

export default InfoTooltip