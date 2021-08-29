import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = (props) => {

  const isLoggedIn = useContext(AuthContext)
  // console.log(isLoggedIn)
    
  if(isLoggedIn === false){
    return <Redirect to="./sign-in"/>
  }
  
  return (
    <Route path={props.path}>
      {
         props.children 
      }
    </Route>
)}

export default ProtectedRoute;