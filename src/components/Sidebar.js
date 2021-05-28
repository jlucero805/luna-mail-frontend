import React, { useContext } from 'react'
import logo from '../static/luna-mail-logo.svg'
import MailContext from '../Contexts/MailContext'
import NewMailContext from '../Contexts/NewMailContext'
import UserContext from '../Contexts/UserContext'
import LoginContext from '../Contexts/LoginContext'
import service from '../services/service'

const Sidebar = props => {
    const { page, setPage } = useContext(MailContext);
    const { allMail, setAllMail } = useContext(MailContext);
    const { allSent, setAllSent } = useContext(MailContext);
    const { singleMail, setSingleMail } = useContext(MailContext);

    const { toInput, setToInput } = useContext(NewMailContext);
    const { titleInput, setTitleInput } = useContext(NewMailContext);
    const { textAreaInput, setTextAreaInput } = useContext(NewMailContext);

    const { user, setUser } = useContext(UserContext);
    const { username, setUsername } = useContext(UserContext);

    const { login, setLogin } = useContext(LoginContext);

    const replyClicker = () => {
        setToInput(singleMail.from)
        setPage('new-mail')
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

    const refreshClicker = async () => {
        const newMail = await service.getMail(user)
        const newSent = await service.getSent(user)
        setAllMail(newMail.data)
        setAllSent(newSent.data)
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

    const newMailClear = () => {
        setToInput('')
        setTitleInput('')
        setTextAreaInput('')
    }

    const newMailClicker = () => { setPage('new-mail') }
    const inboxClicker = () => { setPage('inbox') }
    const sentClicker = () => { setPage('sent') }
    const aboutClicker = () => { setPage('about') }

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
    return (
        <div className={!props.fullscreen ? "sidebar" : "sidebar-gone"}>
            <img src={logo} alt="Luna Mail" className="logo"></img>
            <div className={page == 'detail' ? 'side-btns-new-mail' : 'side-btns none-1'}>
                <div onClick={() => replyClicker()} className="btn-pop">reply</div>
                <div onClick={() => deleteClicker()} className="btn-pop">delete</div>
            </div>
            <div className={page == 'inbox' ? 'side-btns-new-mail' : 'side-btns none'}>
                <div onClick={() => refreshClicker()} className="btn-pop">refresh</div>
            </div>
            <div className={page == 'sent' ? 'side-btns-new-mail' : 'side-btns none'}>
                <div onClick={() => refreshClicker()} className="btn-pop">refresh</div>
            </div>
            <div className={page == 'new-mail' ? 'side-btns-new-mail' : 'side-btns none'}>
                <div onClick={() => sendClicker()} className="btn-pop">send</div>
                <div onClick={() => newMailClear()} className="btn-pop">clear</div>
            </div>
            <div className="side-btns">
                <div onClick={() => newMailClicker()} className="btn">new mail</div>
                <div onClick={() => inboxClicker()} className="btn">inbox</div>
                <div onClick={() => sentClicker()} className="btn">sent</div>
                <div className="btn">contacts</div>
                <div className="btn">settings</div>
                <div onClick={() => aboutClicker()} className="btn">about</div>
                <div onClick={() => logoutClicker()} className="btn logout-text">logout</div>
            </div>
        </div>
    )
}

export default Sidebar