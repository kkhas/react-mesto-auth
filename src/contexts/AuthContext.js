import React, { useState } from 'react';

export const AuthContext = React.createContext( {isLoggedIn: false} );

export const AuthContextWrapper = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function toggle(value) {
        setIsLoggedIn(value)
    }

    return <AuthContext.Provider value={{isLoggedIn, setupLoggedIn: toggle}}>
        {children}
    </AuthContext.Provider>
}