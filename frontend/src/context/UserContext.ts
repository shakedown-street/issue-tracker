import { createContext } from 'react';
import React = require('react');

interface IUserContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const defaultUserContext: IUserContext = {
  user: null,
  setUser: (user: React.SetStateAction<null>) => {},
};

export const UserContext = createContext<IUserContext>(defaultUserContext);
