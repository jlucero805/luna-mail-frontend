import React, { createContext, useContext, useState } from 'react'

const LoginContext = createContext({});

export const useLogin = () => {
    return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {
	const [login, setLogin] = useState(true)
	const [loginUsername, setLoginUsername] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

    return (
        <LoginContext.Provider value={{
              login, setLogin,
              loginUsername, loginPassword,
              setLoginUsername, setLoginPassword,
              isLoading, setIsLoading
        }}>
            {children}
        </LoginContext.Provider>
    )
}


