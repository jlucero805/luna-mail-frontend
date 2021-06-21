import React, { useContext } from 'react'
import dates from '../utils/dates'
import MailContext from '../Contexts/MailContext'
import NewMailContext from '../Contexts/NewMailContext'
import { MailProvider, useMail } from '../Contexts/MailProvider'
import { NewMailProvider, useNewMail } from '../Contexts/NewMailProvider'
import { UserProvider, useUser } from '../Contexts/UserProvider'
import service from '../services/service'
import { strings } from '../res/variables'

const Content = props => {
    const { allMail, setAllMail } = useMail();
    const { allSent, setAllSent } = useMail();
    const { singleMail, setSingleMail } = useMail();
    const { page, setPage } = useMail();

    const { toInput, setToInput } = useNewMail();
    const { titleInput, setTitleInput } = useNewMail();
    const { textAreaInput, setTextAreaInput } = useNewMail();

    const { user, setUser } = useUser();
    const { contacts, setContacts } = useUser();
    const { contactInput, setContactInput } = useUser();

    const mailClicker = mail => {
        setSingleMail(mail);
        setPage('detail');
    }

    const toInputChanger = e => { setToInput(e) }
    const titleInputChanger = e => { setTitleInput(e) }
    const textAreaInputChanger = e => { setTextAreaInput(e) }
    const contactInputChanger = e => { setContactInput(e) }

    const respondContact = con => {
        setPage('new-mail');
        setToInput(con);
    }

    const addContact = async () => {
        if (!contacts.find(contact => contact === contactInput)) {
            const con = await service.addContact(user, { newContact: contactInput });
            if (con.data.results === "success") {
                setContacts(old => old.concat([contactInput]));
                window.alert(`${contactInput} added succesfully!`);
            } else {
                window.alert(`${contactInput} does not exist!`);
            }
            setContactInput("");
        } else {
            window.alert(`${contactInput} already exists!`);
        }
    }

    const delContact = async (con) => {
        if (window.confirm(`do you want to delete ${con} from your contacts?`)) {
            const all = await service.setContacts(user, { contacts: contacts.filter(one => one !== con) });
            setContacts(all => all.filter(name => name !== con));
        }
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
                <p className="text">{strings.ABOUT_TEXT_BODY}</p>
                <p className="text">{strings.ABOUT_TEXT_HEADER_1}</p>
                <p className="text">{strings.ABOUT_TEXT_HEADER_2}</p>
                <a href="https://github.com/jlucero805/luna-mail-frontend" className="text">github.com/jlucero805/luna-mail-frontend</a>
                <p className="text">{strings.ABOUT_TEXT_HEADER_3}</p>
                <a href="https://github.com/jlucero805/luna-mail-back" target="_blank" className="text">github.com/jlucero805/luna-mail-back</a>
            </div>

            {/* contacts */}
            <div className={page === 'contacts' ? 'mail-detail' : 'none'}>
                <h2>Contacts</h2>
                <div className="add-contact">
                    <input onChange={e => contactInputChanger(e.target.value)} value={contactInput} className="add-contact-in"></input>
                    <div onClick={addContact} className="add-contact-btn">{strings.CONTACT_ADD}</div>
                </div>
                {contacts.length > 0
                    ? contacts.map(contact => (
                        <div className="single-contact" key={contact}>
                            <p className="text">{contact}</p>
                            <div className="contact-btns">
                                <div onClick={() => respondContact(contact)} className="contact-msg">{strings.CONTACT_RESPOND}</div>
                                <div onClick={() => delContact(contact)} className="contact-del">{strings.CONTACT_DELETE}</div>
                            </div>
                        </div>
                    ))
                    : <p className="contact-text">{strings.CONTACT_EMPTY}</p>}

            </div>

            {/* settings */}
            <div className={page === 'settings' ? 'mail-detail' : 'none'}>
                <h2>{strings.SETTINGS_HEADER}</h2>
                <p className="text">{strings.SETTINGS_AUTO_LOGIN}</p>
            </div>
        </>
    )
}

export default Content