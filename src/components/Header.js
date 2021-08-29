import React from 'react';
import logo from '../images/header_logo.svg'
import { Route, Switch, Link } from 'react-router-dom';
import {Logout} from './Logout';

function Header(props) {
  
  return (
    <header className="header">
      <a className="header__link" target="_blank" href="#"><img className="header__logo" src={logo} alt="Логотип"/></a>
      
      <div className="header__user">
        <Switch>
          <Route exact path="/">
              <p className="header__user-email">{props.email}</p>
              <Logout onSignOut={props.onSignOut}>Выйти</Logout>
          </Route>
          
          <Route path="/sign-up">
              <Link to="/sign-in" className="header__user-exit">Войти</Link>
          </Route>
          
          <Route path="/sign-in">
              <Link to="/sign-up" className="header__user-exit">Регистрация</Link>
          </Route>
        </Switch>
      </div>
      
    </header>
  );
}

export default Header;