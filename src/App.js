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

function App() {
  //user details, user is stored in form of token
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState(true)
  const [page, setPage] = useState('inbox')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [singleMail, setSingleMail] = useState({})
  const [allMail, setAllMail] = useState([])
  const [allSent, setAllSent] = useState([])

  //new mail page inputs
  const [toInput, setToInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [textAreaInput, setTextAreaInput] = useState('')

  //variable that toggles hamburger menu
  const [fullscreen, setFullscreen] = useState(false)

  //auto login if token is in localStorage
  useEffect(async () => {
    setIsLoading(true)
    await service.login({
      username: "this will never work 092348",
      passHash: 'haha asl; fdalk939465466   23 never'
    })
    if (localStorage.getItem('token')) {
      setIsLoading(true)
      const getAllMail = await service.getMail(localStorage.getItem('token'))
      setUser(localStorage.getItem('token'))
      setAllMail(getAllMail.data)
      setLogin(false)
      const getUsername = await service.getUsername(localStorage.getItem('token'))
      setUsername(getUsername.data.name)
      setLoginUsername('')
      setLoginPassword('')
      const getSentMail = await service.getSent(localStorage.getItem('token'))
      setAllSent(getSentMail.data)
      setIsLoading(false)
    } else {
      setIsLoading(false);
    }
  }, [])

  //Clickers
  const fullscreenClicker = () => { setFullscreen(prev => !prev) }

  if (login) {
    return (
      <MailContext.Provider value={{
        singleMail, setSingleMail,
        allMail, setAllMail,
        allSent, setAllSent,
        page, setPage
      }}>
        <NewMailContext.Provider value={{
          toInput, setToInput,
          titleInput, setTitleInput,
          textAreaInput, setTextAreaInput
        }}>
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
        </NewMailContext.Provider>
      </MailContext.Provider>
    )
  } else {
    return (
      <MailContext.Provider value={{
        singleMail, setSingleMail,
        allMail, setAllMail,
        allSent, setAllSent,
        page, setPage
      }}>
        <NewMailContext.Provider value={{
          toInput, setToInput,
          titleInput, setTitleInput,
          textAreaInput, setTextAreaInput
        }}>
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
              <div className={!fullscreen ? "container" : "container-gone"}>
                <Sidebar
                  fullscreen={fullscreen}
                />
                <Nav
                  fullscreen={fullscreen}
                  fullscreenClicker={fullscreenClicker}
                  page={page} />
                <Content />
              </div>
            </LoginContext.Provider>
          </UserContext.Provider>
        </NewMailContext.Provider>
      </MailContext.Provider>
    );
  }
}

export default App;
