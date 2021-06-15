import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext({});

export const useSettings = () => {
	return useContext(SettingsContext);
}

export const SettingsProvider = ({children}) => {
	const [autoLogin, setAutoLogin] = useState(true);

	return (
		<SettingsContext.Provider value={{
			autoLogin, setAutoLogin
		}}>
			{children}
		</SettingsContext.Provider>
	)
}
