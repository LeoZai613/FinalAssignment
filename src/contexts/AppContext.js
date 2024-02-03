import React, {createContext, useContext, useState} from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Implement your login logic here
    setUser({email});
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{user, login, logout}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
