import React from "react";
import './Container.css'
import { Routes, Route } from "react-router-dom";
import TodoList from "../../pages/TodoList/TodoList";
import EmojiVoting from "../../pages/EmojiVoting/EmojiVoting";

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
        </Routes>
    </main>
  }
}

export default Container;