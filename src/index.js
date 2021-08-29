import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../src/index.css';
import App from './components/App';
import { AuthContextWrapper } from './contexts/AuthContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter> 
    <AuthContextWrapper>
      <App />
      </AuthContextWrapper>  
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
