import { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make App'),
        this.createTodoItem('Have a lunch'),
      ],
      filter: 'all',
    };
  }
  
  createTodoItem(description) {
    return {
      description,
      completed: false,
      id: this.maxId++,
      date: Date.now(),
    };
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const cleanArr = todoData.filter((el) => !el.completed);
      return { todoData: cleanArr };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArr };
    });
  };

  filterSetState = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { todoData, filter } = this.state;
    const taskNotCompletedCount = this.state.todoData.filter((el) => !el.completed).length;
    return (
      <section className="todoapp">
        <Header onItemAdd={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoData.filter((el) => {
              if (filter === 'active') {
                return !el.completed;
              }
              if (filter === 'all') {
                return el;
              }
              if (filter === 'completed') {
                return el.completed;
              }
              return el;
            })}
            onDelete={this.deleteItem}
            onToggle={this.onToggleDone}
          />
        </section>
        <Footer onFilter={this.filterSetState} taskToComplete={taskNotCompletedCount} clearAll={this.clearCompleted} />
        {/* <button >button</button> */}
      </section>
    );
  }
}