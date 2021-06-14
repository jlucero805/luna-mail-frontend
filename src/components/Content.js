import React, { useContext } from 'react'
import dates from '../utils/dates'
import MailContext from '../Contexts/MailContext'
import NewMailContext from '../Contexts/NewMailContext'
import { MailProvider, useMail } from '../Contexts/MailProvider'
import { NewMailProvider, useNewMail } from '../Contexts/NewMailProvider'
import { UserProvider, useUser } from '../Contexts/UserProvider'

const Content = props => {
    const { allMail, setAllMail } = useMail();
    const { allSent, setAllSent } = useMail();
    const { singleMail, setSingleMail } = useMail();
    const { page, setPage } = useMail();

    const { toInput, setToInput } = useNewMail();
    const { titleInput, setTitleInput } = useNewMail();
    const { textAreaInput, setTextAreaInput } = useNewMail();

    const { contacts, setContacts } = useUser();

    const mailClicker = mail => {
        setSingleMail(mail);
        setPage('detail');
    }

    const toInputChanger = e => { setToInput(e) }
    const titleInputChanger = e => { setTitleInput(e) }
    const textAreaInputChanger = e => { setTextAreaInput(e) }

    const respondContact = con => {
        setPage('new-mail');
        setToInput(con);
    }

    return (
        <>
            {/* inbox page */}
            <div className={page == 'inbox' ? "mailbox" : "mailbox none"}>
                {allMail.map(m => (
                    <div onClick={() => mailClicker(m)} key={m._id} className="mail" >
                        <div className="top">
                            <p className="text-date">{dates.parseTime(m.dateSent)}</p>
                        </div>
                        <h2>{m.title}</h2>
                        <h4>from: {m.from}</h4>
                        <p className="text">{m.content}</p>
                    </div>
                ))}
            </div>

            {/* Mail detail page */}
            <div className={page == 'detail' ? "mail-detail" : 'mail-detail none'}>
                <h2>{singleMail.title}</h2>
                <h4>from: {singleMail.from}</h4>
                <p className="text">{singleMail.content !== undefined ? singleMail.content.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br />
                    </span>
                )) : null}</p>
            </div>

            {/* new mail page */}
            <div className={page == 'new-mail' ? 'new-mail' : 'new-mail none'}>
                <div className="input-container">
                    <p className="text input-text">to:</p>
                    <input onChange={e => toInputChanger(e.target.value)} value={toInput} className="input-input"></input>
                </div>
                <div className="input-container">
                    <p className="text input-text">title:</p>
                    <input onChange={e => titleInputChanger(e.target.value)} value={titleInput} className="input-input"></input>
                </div>
                <textarea onChange={e => textAreaInputChanger(e.target.value)} value={textAreaInput} className="input-textarea"></textarea>
            </div>

            {/* sent mail page */}
            <div className={page == 'sent' ? "mailbox" : "mailbox none"}>
                {allSent.map(m => (
                    <div onClick={() => mailClicker(m)} key={m._id} className="mail" >
                        <div className="top">
                            <p className="text-date">{dates.parseTime(m.dateSent)}</p>
                        </div>
                        <h2>{m.title}</h2>
                        <h4>from: {m.from}</h4>
                        <p className="text">{m.content}</p>
                    </div>
                ))}
            </div>

            {/* about page */}
            <div className={page === 'about' ? 'mail-detail' : 'none'}>
                <h2>Luna Mail</h2>
                <p className="text">This is a personal project that I created in order to
                    learn more about full stack web development. The technologies
                    that I used to build this app include MongoDB, Express, Node.js, and React to
                    complete the MERN stack. This is an ongoing project where I explore various
                    facets of full stack development such as devops, and cyber security.</p>
                <p className="text">Come check out the project at:</p>
                <p className="text">Frontend code:</p>
                <a href="https://github.com/jlucero805/luna-mail-frontend" className="text">github.com/jlucero805/luna-mail-frontend</a>
                <p className="text">Backend code:</p>
                <a href="https://github.com/jlucero805/luna-mail-back" target="_blank" className="text">github.com/jlucero805/luna-mail-back</a>
            </div>

            {/* contacts */}
            <div className={page === 'contacts' ? 'mail-detail' : 'none'}>
                <h2>Contacts</h2>
                {contacts
                    ? contacts.map(contact => (
                        <div className="single-contact" key={contact}>
                            <p className="text">{contact}</p>
                            <div className="contact-btns">
                                <div onClick={() => respondContact(contact)} className="contact-msg">msg</div>
                                <div className="contact-del">del</div>
                            </div>
                        </div>
                    ))
                    : <p className="contact-text">You have 0 contacts</p>}

            </div>

            {/* settings */}
            <div className={page === 'settings' ? 'mail-detail' : 'none'}>
                <h2>Settings</h2>
                <p className="text">settings</p>
            </div>
        </>
    )
}

export default Content