import React from "react";
import './Container.css';
import { Routes, Route } from "react-router-dom";
import TodoList from "../../pages/TodoList/TodoList";
import EmojiVoting from "../../pages/EmojiVoting/EmojiVoting";
import UserList from "../../pages/UserList/UserList";
import Contacts from "../../pages/Contacts/Contacts";
import Login from "../../pages/Login/Login";
import PrivateRoute from '../PrivateRoute/PrivateRoute'; // Оновіть шлях, якщо потрібно

class Container extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return <main className="Container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          <Route path="/emoji" element={<PrivateRoute><EmojiVoting /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
        </Routes>
    </main>
  }
}

export default Container;
