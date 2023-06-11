import React from "react";
import './Container.css';
import { Routes, Route } from "react-router-dom";
import TodoList from "../../pages/TodoList/TodoList";
import EmojiVoting from "../../pages/EmojiVoting/EmojiVoting";
import UserList from "../../pages/UserList/UserList";

class Container extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return <main className="Container">
        <Routes>
          <Route path="/todo" element={<TodoList />} />
          <Route path="/emoji" element={<EmojiVoting />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
    </main>
  }
}

export default Container;