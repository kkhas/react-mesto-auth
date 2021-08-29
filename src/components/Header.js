import React from 'react';
import logo from '../images/header_logo.svg'
import { Route, Switch, Link } from 'react-router-dom';
import {Logout} from './Logout';

function Header(props) {
  
  return (
    <header className="header">
      <a className="header__link" target="_blank" href="#"><img className="header__logo" src={logo} alt="Логотип"/></a>

      <Switch>
        <Route exact path="/">
          <div className="header__user">
            <p className="header__user-email">{props.email}</p>
            <Logout onSignOut={props.onSignOut}>Выйти</Logout>
          </div> 
        </Route>
        
        <Route path="/sign-up">
          <div className="header__user">
            <Link to="/sign-in" className="header__user-exit">Войти</Link>
          </div> 
        </Route>
        
        <Route path="/sign-in">
          <div className="header__user">
            <Link to="/sign-up" className="header__user-exit">Регистрация</Link>
          </div> 
        </Route>
      </Switch>
      
    </header>
  );
}

export default Header;