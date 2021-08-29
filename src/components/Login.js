import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

class Login extends React.Component {
  

  constructor(props){
    super(props);
    
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
   
    if (!this.state.username || !this.state.password){
      return;
    }

    this.props.onLogin({
      password: this.state.password,
      email: this.state.username
    })
  }
  
  render(){
    return(
      <AuthContext.Consumer>
        {() => {
        return ( 
          <section className="register">
            <h2 className="register__heading">Вход</h2>
            <form className="register__form" onSubmit={this.handleSubmit} method="post" noValidate>
              <input className="register__input register__input_value_email" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Email" type="text" id="username" minLength="2" maxLength="40" required/>
              <span className="register__error" id="email-error"></span>
              <input className="register__input register__input_value_password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Пароль" type="password" id="password" minLength="2" maxLength="200" required/>
              <span className="register__error" id="password-error"></span>
              <input className="register__button register__save-button" type="submit" value="Войти"/>
            </form>
          </section>)}}
         
    </AuthContext.Consumer> )
}}

export default withRouter(Login);