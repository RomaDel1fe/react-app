import React from 'react';
import Input from "../baseComponents/Input/Input";
import Button from "../baseComponents/Button/Button";
import './TodoList.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    const storedTodos = localStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    this.state = {
      todos,
      newTodo: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.newTodo) {
      this.setState(prevState => {
        const newTodos = [...prevState.todos, { title: prevState.newTodo, completed: false }];
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return { 
          todos: newTodos, 
          newTodo: "" 
        };
      });
    }
  }

  handleTodoClick = (index) => {
    this.setState(prevState => {
      const todos = [...prevState.todos];
      const todo = { ...todos[index], completed: !todos[index].completed };
      todos[index] = todo;
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    });
  }

  restart = () => {
    this.setState({
      todos: [],
      newTodo: "",
    });
    localStorage.removeItem('todos');
  }

  render() {
    return (
      <div className="Todo">
        <form className="TodoForm" onSubmit={this.handleFormSubmit}>
          <Input 
            type="text" 
            value={this.state.newTodo} 
            onChange={this.handleInputChange} 
            placeholder="Todo" 
          />
          <Button type="primary" label="Add Todo" submit={true} />
        </form>
        <ul className="TodoList">
          {this.state.todos.map((todo, index) => (
            <li key={index} 
                className={todo.completed ? "TodoItem completed" : "TodoItem"} 
                onClick={() => this.handleTodoClick(index)}
            >
              {todo.title}
            </li>
          ))}
          <li className={this.state.todos.length === 0 ? "TodoEmpty" : "TodoEmpty hide"}>Todo is Empty</li>
        </ul>
        <Button type="secondary" onClick={this.restart} label="Reset"/>
      </div>
    );
  }
}

export default TodoList;
