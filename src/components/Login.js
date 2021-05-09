import React, { useState } from 'react'
import logo from '../static/luna-mail-logo.svg'
import service from '../services/service'

const Login = props => {
    const [loginPage, setLoginPage] = useState('login')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const createUserClicker = () => {
        setLoginPage('createUser')
    }

    const postNewUserClicker = async () => {
        const newUser = {
            username: newUsername,
            passHash: newPassword
        }
        if (window.prompt(`retype your username '${newUsername}' to confirm: `) === newUsername) {
            const posted = await service.createUser(newUser)
            if (posted.data.err === 'fail') {
                alert("user already exists")
            } else {
                setLoginPage('login')
                setNewUsername('')
                setNewPassword('')
            }
        } else {
            alert('Incorrect! Try again.')
        }
    }

    const cancelClicker = () => {
        setLoginPage('login')
    }

    const newUsernameChanger = e => {
        setNewUsername(e)
    }

    const newPasswordChanger = e => {
        setNewPassword(e)
    }

    return (
        <>
            <div className={loginPage === 'login' ? 'login' : 'none'}>
                <div className={props.isLoading ? "loading" : "none"} ></div>
                <div className="login-box">
                    <img className="login-logo" src={logo} alt="Luna Mail" ></img>
                    <h2 className="login-text">Luna Mail</h2>
                    <input onChange={e => props.usernameChanger(e.target.value)} value={props.loginUsername} className="login-username"></input>
                    <input type="password" onChange={e => props.passwordChanger(e.target.value)} value={props.loginPassword} className="login-password"></input>
                    <div onClick={() => props.loginClicker()} className="login-btn">login</div>
                    <div onClick={createUserClicker} className="login-btn">new user</div>
                </div>
            </div>
            <div className={loginPage === "createUser" ? 'login' : "none"}>
                <div className="login-box">
                    <h2 className="login-text">Create New User</h2>
                    <input onChange={e => newUsernameChanger(e.target.value)} value={newUsername} className="login-username"></input>
                    <input onChange={e => newPasswordChanger(e.target.value)} value={newPassword} className="login-password"></input>
                    <div onClick={postNewUserClicker} className="login-btn">create user</div>
                    <div onClick={cancelClicker} className="login-btn">cancel</div>
                </div>
            </div>
        </>
    )
}

export default Login