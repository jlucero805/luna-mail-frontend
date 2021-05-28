import React, { useState, useContext, useEffect } from 'react'
import logo from '../static/luna-mail-logo.svg'
import service from '../services/service'
import LoginContext from '../Contexts/LoginContext'
import UserContext from '../Contexts/UserContext'
import { MailProvider, useMail } from '../Contexts/MailProvider'

const Login = props => {
    const { loginUsername, setLoginUsername } = useContext(LoginContext);
    const { loginPassword, setLoginPassword } = useContext(LoginContext);
    const { isLoading, setIsLoading } = useContext(LoginContext);
    const { login, setLogin } = useContext(LoginContext);

    const { allMail, setAllMail } = useMail();
    const { allSent, setAllSent } = useMail();

    const { user, setUser } = useContext(UserContext);
    const { username, setUsername } = useContext(UserContext);

    const [loginPage, setLoginPage] = useState('login');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    //auto login if token is in localStorage
    useEffect(async () => {
        setIsLoading(true)
        await service.login({
            username: "this will never work 092348",
            passHash: 'haha asl; fdalk939465466   23 never'
        })
        if (localStorage.getItem('token')) {
            setIsLoading(true)
            const getAllMail = await service.getMail(localStorage.getItem('token'))
            setUser(localStorage.getItem('token'))
            setAllMail(getAllMail.data)
            setLogin(false)
            const getUsername = await service.getUsername(localStorage.getItem('token'))
            setUsername(getUsername.data.name)
            setLoginUsername('')
            setLoginPassword('')
            const getSentMail = await service.getSent(localStorage.getItem('token'))
            setAllSent(getSentMail.data)
            setIsLoading(false)
        } else {
            setIsLoading(false);
        }
    }, [])

    const createUserClicker = () => { setLoginPage('createUser'); }

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
                setLoginPage('login');
                setNewUsername('');
                setNewPassword('');
            }
        } else {
            alert('Incorrect! Try again.')
        }
    }

    const cancelClicker = () => {
        setLoginPage('login')
    }

    //Changers
    const usernameChanger = e => { setLoginUsername(e) }
    const passwordChanger = e => { setLoginPassword(e) }
    const newUsernameChanger = e => { setNewUsername(e) }
    const newPasswordChanger = e => { setNewPassword(e) }

    const loginClicker = async () => {
        setIsLoading(e => true)
        const token = await service.login({ username: loginUsername, passHash: loginPassword })
        setUser(token.data.accessToken)
        localStorage.setItem("token", token.data.accessToken)
        const getAllMail = await service.getMail(token.data.accessToken)
        setAllMail(getAllMail.data)
        setLogin(e => false)
        setUsername(loginUsername)
        setLoginUsername('')
        setLoginPassword('')
        const getSentMail = await service.getSent(token.data.accessToken)
        setAllSent(getSentMail.data)
        setIsLoading(e => false)
    }

    return (
        <>
            <div className={loginPage === 'login' ? 'login' : 'none'}>
                <div className={isLoading ? "loading" : "none"} ></div>
                <div className="login-box">
                    <img className="login-logo" src={logo} alt="Luna Mail" ></img>
                    <h2 className="login-text">Luna Mail</h2>
                    <input onChange={e => usernameChanger(e.target.value)} value={loginUsername} className="login-username"></input>
                    <input type="password" onChange={e => passwordChanger(e.target.value)} value={loginPassword} className="login-password"></input>
                    <div onClick={() => loginClicker()} className="login-btn">login</div>
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