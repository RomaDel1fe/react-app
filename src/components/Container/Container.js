import React from "react";
import './Container.css'
import { Routes, Route } from "react-router-dom";
import TodoList from "../TodoList/TodoList";
import EmojiVoting from "../EmojiVoting/EmojiVoting";

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