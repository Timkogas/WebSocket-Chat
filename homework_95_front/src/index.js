import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import usersReducer from './store/reducers/usersReducer';


const localStorageMiddleware = ({getState}) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("user", JSON.stringify(getState().users.user));
  return result;
};
const loadFromLocalStorage = () => {
  if (localStorage.getItem("user") !== null) {
      return {users: {user: JSON.parse(localStorage.getItem("user"))}}
  }
  return undefined;
};


const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
