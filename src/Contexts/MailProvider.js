import React, { createContext, useContext, useState } from 'react'

const MailContext = createContext({});

export const useMail = () => {
    return useContext(MailContext);
}

export const MailProvider = ({ children }) => {
    const [singleMail, setSingleMail] = useState({})
    const [allMail, setAllMail] = useState([])
    const [allSent, setAllSent] = useState([])
    const [page, setPage] = useState('inbox');

    return (
        <MailContext.Provider value={{
            singleMail, setSingleMail,
            allMail, setAllMail,
            allSent, setAllSent,
            page, setPage
        }}>
            {children}
        </MailContext.Provider>
    )
}


