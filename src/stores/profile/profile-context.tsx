import {createContext} from 'react';

export const ProfileContext = createContext({});

export const ProfileContextProvider = () => {
  return <ProfileContext.Provider value={{}}></ProfileContext.Provider>;
};
