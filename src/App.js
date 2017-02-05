import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo/';
import {
          addTodo,
          generateId,
          findById,
          toggleTodo,
          updateTodo,
          removeTodo,
          filterTodos } from './lib/todoHelpers';

import {partial, pipe} from './lib/utils';


class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an Awesome App', isComplete: false},
      {id: 3, name: 'Ship it!', isComplete: false},
    ],
    currentTodo: '',
    errorMessage: ''
  };

  static contextTypes = {
    route: React.PropTypes.string
  };

  handleToggle(id) {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);

    this.setState({
      todos: updatedTodos
    })
  }

  handleRemove(id, e) {
    e.preventDefault();

    const updatedTodos = removeTodo(this.state.todos, id);

    this.setState({
      todos: updatedTodos
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newId = generateId();
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false
    };

    const updatedTodos = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });
  }

  handleEmptySubmit(e) {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  }

  handleInputChange(e) {
    this.setState({
      currentTodo: e.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? ::this.handleSubmit : ::this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}

          <TodoForm handleInputChange={::this.handleInputChange}
                    currentTodo={this.state.currentTodo}
                    handleSubmit={submitHandler} />

          <TodoList handleRemove={::this.handleRemove}
                    handleToggle={::this.handleToggle}
                    todos={displayTodos} />
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
