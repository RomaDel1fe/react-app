import React, { createContext, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      const user = state.users.find((user) => user.username === action.payload.username);
      const passwordCorrect = user && user.password === action.payload.password;

      if (user) {
        if (passwordCorrect) {
          localStorage.setItem('isLoggedIn', 'true');
          return { ...state, isLoggedIn: true, loginError: null, passwordError: null };
        } else {
          return { ...state, loginError: null, passwordError: 'Invalid password' };
        }
      } else {
        return { ...state, loginError: 'User not found', passwordError: null };
      }
    case 'logout':
      localStorage.removeItem('isLoggedIn');
      return { ...state, isLoggedIn: false, loginError: null, passwordError: null };
    case 'setLoginError':
      return { ...state, loginError: action.payload };
    case 'setPasswordError':
      return { ...state, passwordError: action.payload };
    case 'register':
      const existingUser = state.users.find((user) => user.username === action.payload.username);
      if (existingUser) {
        return { ...state, registrationError: 'User already exists' };
      } else {
        const newUser = { username: action.payload.username, password: action.payload.password };
        const newUsers = [...state.users, newUser];
        localStorage.setItem('users', JSON.stringify(newUsers)); 
        return { ...state, users: newUsers, registrationError: null };
      }
    default:
      return state;
  }
}

const storedUsers = localStorage.getItem('users');
const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  loginError: null,
  passwordError: null,
  registrationError: null,
  users: parsedUsers.length > 0 ? parsedUsers : [
    { username: 'romad', password: 'Vlad1986imir' },
    { username: 'alexx', password: 'Alex12345' },
  ],
};




export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    isLoggedIn: state.isLoggedIn,
    loginError: state.loginError,
    passwordError: state.passwordError,
    registrationError: state.registrationError,
    users: state.users,
    login: (payload) => dispatch({ type: 'login', payload }),
    logout: () => dispatch({ type: 'logout' }),
    register: (payload) => dispatch({ type: 'register', payload }),
    setLoginError: (payload) => dispatch({ type: 'setLoginError', payload }),
    setPasswordError: (payload) => dispatch({ type: 'setPasswordError', payload }),
    setRegistrationError: (payload) => dispatch({ type: 'setRegistrationError', payload }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
