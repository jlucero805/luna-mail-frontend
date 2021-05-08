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

            {/* about page */}
            <div className={props.page === 'about' ? 'mail-detail' : 'none'}>
                <h2>Luna Mail</h2>
                <p className="text">This is a personal project that I created in order to
                learn more about full stack web development. The technologies
                that I used to build this app include MongoDB, Express, Node.js, and React to
                complete the MERN stack. This is an ongoing project where I explore various
                facets of full stack development such as devops, and cyber security.</p>
                <p className="text">Come check out the project at:</p>
                <p className="text">Frontend code:</p>
                <a href="https://github.com/jlucero805/luna-mail-frontend"url className="text">github.com/jlucero805/luna-mail-frontend</a>
                <p className="text">Backend code:</p>
                <a href="https://github.com/jlucero805/luna-mail-back" target="_blank" className="text">github.com/jlucero805/luna-mail-back</a>
            </div>
        </>
    )
}

export default Content