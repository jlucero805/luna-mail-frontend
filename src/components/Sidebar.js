import React, { useContext } from 'react'
import logo from '../static/luna-mail-logo.svg'
import MailContext from '../Contexts/MailContext'
import NewMailContext from '../Contexts/NewMailContext'
import UserContext from '../Contexts/UserContext'
import LoginContext from '../Contexts/LoginContext'
import service from '../services/service'
import { MailProvider, useMail } from '../Contexts/MailProvider'
import { NewMailProvider, useNewMail } from '../Contexts/NewMailProvider'
import { UserProvider, useUser } from '../Contexts/UserProvider'
import { strings } from '../res/variables'

const Sidebar = props => {
    const {allMail, setAllMail} = useMail();
    const {allSent, setAllSent} = useMail();
    const {singleMail, setSingleMail} = useMail();
    const {page, setPage} = useMail();

    const { toInput, setToInput } = useNewMail();
    const { titleInput, setTitleInput } = useNewMail();
    const { textAreaInput, setTextAreaInput } = useNewMail();

    const { user, setUser } = useUser();
    const { username, setUsername } = useUser();
    const { contacts, setContacts } = useUser();

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
    const settingsClicker = () => {setPage('settings')}
    const aboutClicker = () => { setPage('about') }

    const contactsClicker = async () => {
        setPage('contacts')
        const contactList = await service.getContacts(user);
        setContacts(contactList.data.contacts);
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
    return (
        <div className={!props.fullscreen ? "sidebar" : "sidebar-gone"}>
            <img src={logo} alt="Luna Mail" className="logo"></img>
            <div className={page == 'detail' ? 'side-btns-new-mail' : 'side-btns none-1'}>
                <div onClick={() => replyClicker()} className="btn-pop">{strings.SIDEBAR_REPLY}</div>
                <div onClick={() => deleteClicker()} className="btn-pop">{strings.SIDEBAR_DELETE}</div>
            </div>
            <div className={page == 'inbox' ? 'side-btns-new-mail' : 'side-btns none'}>
                <div onClick={() => refreshClicker()} className="btn-pop">{strings.SIDEBAR_REFRESH}</div>
            </div>
            <div className={page == 'sent' ? 'side-btns-new-mail' : 'side-btns none'}>
                <div onClick={() => refreshClicker()} className="btn-pop">{strings.SIDEBAR_REFRESH}</div>
            </div>
            <div className={page == 'new-mail' ? 'side-btns-new-mail' : 'side-btns none'}>
                <div onClick={() => sendClicker()} className="btn-pop">{strings.SIDEBAR_SEND}</div>
                <div onClick={() => newMailClear()} className="btn-pop">{strings.SIDEBAR_CLEAR}</div>
            </div>
            <div className="side-btns">
                <div onClick={() => newMailClicker()} className="btn">{strings.SIDEBAR_NEW_MAIL}</div>
                <div onClick={() => inboxClicker()} className="btn">{strings.SIDEBAR_INBOX}</div>
                <div onClick={() => sentClicker()} className="btn">{strings.SIDEBAR_SENT}</div>
                <div onClick={() => contactsClicker()} className="btn">{strings.SIDEBAR_CONTACTS}</div>
                <div onClick={() => settingsClicker()} className="btn">{strings.SIDEBAR_SETTINGS}</div>
                <div onClick={() => aboutClicker()} className="btn">{strings.SIDEBAR_ABOUT}</div>
                <div onClick={() => logoutClicker()} className="btn logout-text">{strings.SIDEBAR_LOGOUT}</div>
            </div>
        </div>
    )
}

export default Sidebar