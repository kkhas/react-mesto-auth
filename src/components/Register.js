import React, { useState} from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister({
      password: password,
      email: email
    });
  }


  return (
    <section className="register" >
        <h2 className="register__heading">Регистрация</h2>
        <form className="register__form" onSubmit={handleSubmit} method="post">
          <input className="register__input register__input_value_email" value={email} onChange={handleEmailChange} placeholder="Email" type="text" name="email" id="email" minLength="2" maxLength="40" required/>
          <span className="register__error" id="email-error"></span>
          <input className="register__input register__input_value_password" value={password} onChange={handlePasswordChange} placeholder="Пароль" type="password" name="password" id="password" minLength="2" maxLength="200" required/>
          <span className="register__error" id="password-error"></span>
          <input className="register__button register__save-button" type="submit" value="Зарегистрироваться"/>
        </form>
        <p className="register__registered">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__login"> Войти</Link>
          </p>
    </section>
  );
}

export default Register;