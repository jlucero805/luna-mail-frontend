import React from 'react'
import dates from '../utils/dates'

const Content = props => {

    return (
        <>
            {/* inbox page */}
            <div className={props.page == 'inbox' ? "mailbox" : "mailbox none"}>
                {props.mail.map(m => (
                    <div onClick={() => props.mailClicker(m)} key={m._id} className="mail" >
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
            <div className={props.page == 'detail' ? "mail-detail" : 'mail-detail none'}>
                <h2>{props.singleMail.title}</h2>
                <h4>from: {props.singleMail.from}</h4>
                <p className="text">{props.singleMail.content !== undefined ? props.singleMail.content.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br/>
                    </span>
                )) : null}</p>
            </div>

            {/* new mail page */}
            <div className={props.page == 'new-mail' ? 'new-mail' : 'new-mail none'}>
                <div className="input-container">
                    <p className="text input-text">to:</p>
                    <input onChange={e => props.toInputChanger(e.target.value)} value={props.toInput} className="input-input"></input>
                </div>
                <div className="input-container">
                    <p className="text input-text">title:</p>
                    <input onChange={e => props.titleInputChanger(e.target.value)} value={props.titleInput} className="input-input"></input>
                </div>
                <textarea onChange={e => props.textAreaInputChanger(e.target.value)} value={props.textAreaInput} className="input-textarea"></textarea>
            </div>

            {/* sent mail page */}
            <div className={props.page == 'sent' ? "mailbox" : "mailbox none"}>
                {props.sentMail.map(m => (
                    <div onClick={() => props.mailClicker(m)} key={m._id} className="mail" >
                        <div className="top">
                            <p className="text-date">{dates.parseTime(m.dateSent)}</p>
                        </div>
                        <h2>{m.title}</h2>
                        <h4>from: {m.from}</h4>
                        <p className="text">{m.content}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Content