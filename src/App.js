import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Content from './components/Content';
import './App.css';
import Login from './components/Login';
import service from './services/service';

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
    setIsLoading(false)
    await service.login({
      username: "this will never work 092348",
      passHash: 'haha asl; fdalk939465466   23 never'
    })
    console.log('requested!')
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
    }
  }, [])

  //Changers
  const toInputChanger = e => { setToInput(e) }
  const titleInputChanger = e => { setTitleInput(e) }
  const textAreaInputChanger = e => { setTextAreaInput(e) }
  const usernameChanger = e => { setLoginUsername(e) }
  const passwordChanger = e => { setLoginPassword(e) }

  //Clickers
  const newMailClicker = () => { setPage('new-mail') }
  const inboxClicker = () => { setPage('inbox') }
  const fullscreenClicker = () => { setFullscreen(prev => !prev) }

  //Opens up single mail into detail page
  const mailClicker = async mail => {
    setSingleMail(mail)
    setPage('detail')
  }

  const newMailClear = () => {
    setToInput('')
    setTitleInput('')
    setTextAreaInput('')
  }


  const deleteClicker = async () => {
    if (window.confirm("Once you delete, message can never be restored!")) {
      service.deleteMail(singleMail._id, user)
      setAllMail(allMail.filter(mail => mail._id !== singleMail._id))
      setAllSent(allSent.filter(mail => mail._id !== singleMail._id))
      setSingleMail({})
      setPage('inbox')
    }
  }

  const sendClicker = async () => {
    const newMail = {
      to: toInput,
      from: username,
      title: titleInput,
      content: textAreaInput
    }
    const res = await service.sendMail(newMail, user)
    if (res.data.err === 'none') {
      alert(`User ${toInput} does not exist.`)
      setToInput('')
    } else {
      setToInput('')
      setTitleInput('')
      setTextAreaInput('')
      setPage('inbox')
    }
  }

  const refreshClicker = async () => {
    const newMail = await service.getMail(user)
    const newSent = await service.getSent(user)
    setAllMail(newMail.data)
    setAllSent(newSent.data)
  }

  const sentClicker = () => {
    setPage('sent')
  }

  const replyClicker = () => {
    setToInput(singleMail.from)
    setPage('new-mail')
  }

  const aboutClicker = () => {
    setPage('about')
  }

  const loginClicker = async () => {
    setIsLoading(true)
    const token = await service.login({ username: loginUsername, passHash: loginPassword })
    setUser(token.data.accessToken)
    localStorage.setItem("token", token.data.accessToken)
    const getAllMail = await service.getMail(token.data.accessToken)
    setAllMail(getAllMail.data)
    setLogin(false)
    setUsername(loginUsername)
    setLoginUsername('')
    setLoginPassword('')
    const getSentMail = await service.getSent(token.data.accessToken)
    setAllSent(getSentMail.data)
    setIsLoading(false)
  }

  const logoutClicker = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setPage('inbox')
      // change to true
      setLogin(true)
      setUser({})
      setSingleMail({})
      setToInput('')
      setTitleInput('')
      setTextAreaInput('')
      setUsername('')
      localStorage.removeItem('token')
    }
  }

  if (login) {
    return (
      <Login
        isLoading={isLoading}
        loginUsername={loginUsername}
        loginPassword={loginPassword}
        usernameChanger={usernameChanger}
        passwordChanger={passwordChanger}
        loginClicker={loginClicker} />
    )
  } else {
    return (
      <div className={!fullscreen ? "container" : "container-gone"}>
        <Sidebar
          page={page}
          fullscreen={fullscreen}
          aboutClicker={aboutClicker}
          refreshClicker={refreshClicker}
          logoutClicker={logoutClicker}
          newMailClicker={newMailClicker}
          newMailClear={newMailClear}
          inboxClicker={inboxClicker}
          sendClicker={sendClicker}
          sentClicker={sentClicker}
          replyClicker={replyClicker}
          deleteClicker={deleteClicker} />
        <Nav
          fullscreen={fullscreen}
          fullscreenClicker={fullscreenClicker}
          page={page} />
        <Content
          toInput={toInput}
          titleInput={titleInput}
          textAreaInput={textAreaInput}
          toInputChanger={toInputChanger}
          titleInputChanger={titleInputChanger}
          textAreaInputChanger={textAreaInputChanger}
          mailClicker={mailClicker}
          sentMail={allSent}
          mail={allMail}
          singleMail={singleMail}
          page={page} />
      </div>
    );
  }
}

export default App;
