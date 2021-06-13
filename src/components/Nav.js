import React, { useState } from 'react'
import { MailProvider, useMail } from '../Contexts/MailProvider'

const Nav = props => {
    const { page, setPage } = useMail();
    return (
        <div className="nav">
            <div onClick={() => props.fullscreenClicker()} className={!props.fullscreen ? "hamburger" : "hamburger"}>{!props.fullscreen ? '☰' : '☰'}</div>
            <p className={page === 'inbox' ? 'nav-title' : 'none'}>Inbox</p>
            <p className={page === 'new-mail' ? 'nav-title' : 'none'}>New Mail</p>
            <p className={page === 'sent' ? 'nav-title' : 'none'}>Sent Mail</p>
            <p className={page === 'about' ? 'nav-title' : 'none'}>About</p>
        </div>
    )
}

export default Nav