import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Content from './components/Content';
import './App.css';
import Login from './components/Login';
import UserContext from './Contexts/UserContext'
import LoginContext from './Contexts/LoginContext';
import { MailProvider } from './Contexts/MailProvider'
import { NewMailProvider } from './Contexts/NewMailProvider';
import { LoginProvider } from './Contexts/LoginProvider';
import { UserProvider } from './Contexts/UserProvider'
import { SettingsProvider } from './Contexts/SettingsProvider'

/*
TODO
-Abstract other contexts onto their own modules

*/

function App() {
  //user details, user is stored in form of token
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState(true)

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  //variable that toggles hamburger menu
  const [fullscreen, setFullscreen] = useState(false)

  //Clickers
  const fullscreenClicker = () => { setFullscreen(prev => !prev) }

  return (
    <SettingsProvider>
      <MailProvider>
        <NewMailProvider>
          {/* <UserContext.Provider value={{
          user, setUser,
          username, setUsername
        }}> */}
          <UserProvider>
            <LoginContext.Provider value={{
              login, setLogin,
              loginUsername, loginPassword,
              setLoginUsername, setLoginPassword,
              isLoading, setIsLoading
            }}>
              {login
                ? <Login />
                : <div className={!fullscreen ? "container" : "container-gone"}>
                  <Sidebar
                    fullscreen={fullscreen}
                  />
                  <Nav
                    fullscreen={fullscreen}
                    fullscreenClicker={fullscreenClicker} />
                  <Content />
                </div>}
            </LoginContext.Provider>
          </UserProvider>
          {/* </UserContext.Provider> */}
        </NewMailProvider>
      </MailProvider >
    </SettingsProvider>
  )
}

export default App;
