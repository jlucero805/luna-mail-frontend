import axios from 'axios'

const baseUrl = "https://agile-garden-69829.herokuapp.com"

const getMail = (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return axios.get(`${baseUrl}/api/mail`, config)
}

const getUsername = token => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return axios.get(`${baseUrl}/api/users`, config)
}

const getSent = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.get(`${baseUrl}/api/mail/sent`, config)
}

const sendMail = (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.post(`${baseUrl}/api/mail`, obj, config)
}

const deleteMail = (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.delete(`${baseUrl}/api/mail/${id}`, config)
}

const login = obj => {
    return axios.post(`${baseUrl}/api/auth/login`, obj)
}

const createUser = obj => {
    return axios.post(`${baseUrl}/api/users`, obj)
}

const getContacts = token => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return axios.get(`${baseUrl}/api/users/contacts`, config)
}

const addContact = (token, obj) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return axios.post(`${baseUrl}/api/users/contacts`, obj, config)
}

const setContacts = (token, obj) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return axios.put(`${baseUrl}/api/users/contacts`, obj, config)
}


export default {
    getMail,
    sendMail,
    login,
    getSent,
    deleteMail,
    createUser,
    getUsername,
    getContacts,
    addContact,
    setContacts
}