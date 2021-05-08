import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Content from './components/Content';
import './App.css';
import Login from './components/Login';
import service from './services/service';

function App() {
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')

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

  useEffect(() => {

  }, [])

  const mailClicker = async mail => {
    setSingleMail(mail)
    setPage('detail')
  }

  const newMailClicker = () => { setPage('new-mail') }

  const inboxClicker = () => { setPage('inbox') }

  const newMailClear = () => {
    setToInput('')
    setTitleInput('')
    setTextAreaInput('')
  }

  const toInputChanger = e => { setToInput(e) }
  const titleInputChanger = e => { setTitleInput(e) }
  const textAreaInputChanger = e => { setTextAreaInput(e) }

  const usernameChanger = e => { setLoginUsername(e) }
  const passwordChanger = e => {setLoginPassword(e) }

  const deleteClicker = async () => {
    service.deleteMail(singleMail._id, user)
    const getAllMail = await service.getMail(user)
    setAllMail(allMail.filter(mail => mail._id !== singleMail._id))
    setSingleMail({})
    setPage('inbox')
  }

  const sendClicker = async () => {
    // const newMail = {
    //   to: toInput,
    //   from: username,

    // }
    await service.sendMail()
  }

  const logoutClicker = () => {
    setPage('inbox')
    // change to true
    setLogin(true)
    setUser({})
    setSingleMail({})
    setToInput('')
    setTitleInput('')
    setTextAreaInput('')
    setUsername('')
  }

  const loginClicker = async () => {
    const token = await service.login({username: loginUsername, passHash: loginPassword})
    console.log(token.data.accessToken)
    setUser(token.data.accessToken)
    const getAllMail = await service.getMail(token.data.accessToken)
    setAllMail(getAllMail.data)
    console.log(getAllMail.data)
    setLogin(false)
    setUsername(loginUsername)
    setLoginUsername('')
    setLoginPassword('')
    const getSentMail = await service.getSent(token.data.accessToken)
    setAllSent(getSentMail.data)
    console.log(getSentMail.data)
  }

  if (login) {
    return (
      <Login
        loginUsername={loginUsername}
        loginPassword={loginPassword}
        usernameChanger={usernameChanger}
        passwordChanger={passwordChanger}
        loginClicker={loginClicker}/>
    )
  } else {
    return (
      <div className="container">
        <Sidebar
          page={page}
          logoutClicker={logoutClicker}
          newMailClicker={newMailClicker}
          newMailClear={newMailClear}
          inboxClicker={inboxClicker}
          sendClicker={sendClicker}
          deleteClicker={deleteClicker} />
        <Nav />
        <Content
          toInput={toInput}
          titleInput={titleInput}
          textAreaInput={textAreaInput}
          toInputChanger={toInputChanger}
          titleInputChanger={titleInputChanger}
          textAreaInputChanger={textAreaInputChanger}
          mailClicker={mailClicker}
          mail={allMail}
          singleMail={singleMail}
          page={page} />
      </div>
    );
  }
}

export default App;
