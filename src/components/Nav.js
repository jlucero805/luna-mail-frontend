import React from 'react'

const Nav = props => {
    return (
        <div className="nav">
            <div onClick={() => props.fullscreenClicker()} className="hamburger">&#9776;</div>
            <p className={props.page === 'inbox' ? 'nav-title' : 'none'}>Inbox</p>
            <p className={props.page === 'new-mail' ? 'nav-title' : 'none'}>New Mail</p>
            <p className={props.page === 'sent' ? 'nav-title' : 'none'}>Sent Mail</p>
            <p className={props.page === 'about' ? 'nav-title' : 'none'}>About</p>
        </div>
    )
}

export default Nav