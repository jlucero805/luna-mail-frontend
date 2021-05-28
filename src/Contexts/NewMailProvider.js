import React, { createContext, useContext, useState } from 'react'

const NewMailContext = createContext({});

export const useNewMail = () => {
    return useContext(NewMailContext);
}

export const NewMailProvider = ({ children }) => {
    const [toInput, setToInput] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [textAreaInput, setTextAreaInput] = useState('')

    return (
        <NewMailContext.Provider value={{
            toInput, setToInput,
            titleInput, setTitleInput,
            textAreaInput, setTextAreaInput
        }}>
            {children}
        </NewMailContext.Provider>
    )
}
