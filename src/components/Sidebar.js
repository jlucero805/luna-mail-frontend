import React, { useContext } from 'react'
import logo from '../static/luna-mail-logo.svg'
import MailContext from '../Contexts/MailContext'
import NewMailContext from '../Contexts/NewMailContext'
import UserContext from '../Contexts/UserContext'
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
                <div onClick={() => props.sendClicker()} className="btn-pop">send</div>
                <div onClick={() => props.newMailClear()} className="btn-pop">clear</div>
            </div>
            <div className="side-btns">
                <div onClick={() => props.newMailClicker()} className="btn">new mail</div>
                <div onClick={() => props.inboxClicker()} className="btn">inbox</div>
                <div onClick={() => props.sentClicker()} className="btn">sent</div>
                <div className="btn">contacts</div>
                <div className="btn">settings</div>
                <div onClick={() => props.aboutClicker()} className="btn">about</div>
                <div onClick={() => props.logoutClicker()} className="btn logout-text">logout</div>
            </div>
        </div>
    )
}

export default Sidebar