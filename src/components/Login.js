import React from 'react'
import logo from '../static/luna-mail-logo.svg'

const Login = props => {
    return (
        <div className="login">
            <div className="login-box">
                <img className="login-logo" src={logo} alt="Luna Mail" ></img>
                <h2 className="login-text">Luna Mail</h2>
                <input onChange={e => props.usernameChanger(e.target.value)} value={props.loginUsername} className="login-username"></input>
                <input onChange={e => props.passwordChanger(e.target.value)} value={props.loginPassword} className="login-password"></input>
                <div onClick={() => props.loginClicker()} className="login-btn">login</div>
            </div>
        </div>
    )
}

export default Login