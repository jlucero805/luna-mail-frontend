import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Content from './components/Content';
import './App.css';
import Login from './components/Login';
import service from './services/service';
import MailContext from './Contexts/MailContext';
import NewMailContext from './Contexts/NewMailContext';
import UserContext from './Contexts/UserContext'
import LoginContext from './Contexts/LoginContext';
import { MailProvider } from './Contexts/MailProvider'
import { NewMailProvider } from './Contexts/NewMailProvider';

function App() {
  //user details, user is stored in form of token
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState(true)

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [singleMail, setSingleMail] = useState({})
  const [allMail, setAllMail] = useState([])
  const [allSent, setAllSent] = useState([])
  const [page, setPage] = useState('inbox')

  //new mail page inputs
  const [toInput, setToInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [textAreaInput, setTextAreaInput] = useState('')

  //variable that toggles hamburger menu
  const [fullscreen, setFullscreen] = useState(false)

  //Clickers
  const fullscreenClicker = () => { setFullscreen(prev => !prev) }

  return (
    <MailProvider>
      <NewMailProvider>
        {/* <NewMailContext.Provider value={{
          toInput, setToInput,
          titleInput, setTitleInput,
          textAreaInput, setTextAreaInput
        }}> */}
          <UserContext.Provider value={{
            user, setUser,
            username, setUsername
          }}>
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
                    fullscreenClicker={fullscreenClicker}
                    page={page} />
                  <Content />
                </div>}
            </LoginContext.Provider>
          </UserContext.Provider>
        {/* </NewMailContext.Provider> */}
      </NewMailProvider>
    </MailProvider>
  )
}

export default App;
