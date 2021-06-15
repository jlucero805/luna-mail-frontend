import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext({});

export const useUser = () => {
	return useContext(UserContext);
}

export const UserProvider = ({children}) => {
	const [user, setUser] = useState({});
	const [username, setUsername] = useState('');
	const [contacts, setContacts] = useState([]);
	const [contactInput, setContactInput] = useState('');
	
	return (
		<UserContext.Provider value={{
			user, setUser,
			username, setUsername,
			contacts, setContacts,
			contactInput, setContactInput
		}}>
			{children}
		</UserContext.Provider>
	)
}
