import {createContext, useState, ReactNode} from 'react';
import {TUser} from '../../utils/constants';

type TauthValues = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

const initialValues: TauthValues = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext(initialValues);

type props = {children: ReactNode};

const AuthContextProvider = ({children}: props) => {
  const [user, setUser] = useState<TUser | null>(null);

  const values: TauthValues = {
    user: user,
    setUser: user => setUser(user),
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
