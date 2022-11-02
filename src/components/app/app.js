import { Component } from "react";

import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      todoData: [
        this.createTodoItem("Drink Coffee"),
        this.createTodoItem("Make App"),
        this.createTodoItem("Have a lunch"),
        this.createTodoItem("test", 1, 1),
      ],
      filter: "all",
    };
  }

  createTodoItem(description, min, sec) {
    return {
      description,
      completed: false,
      partNum: this.maxId++,
      date: Date.now(),
      min: +min || 0,
      sec: +sec || 0,
      fullTime: min * 60 + sec,
    };
  }

  updateTimeFormTimerTask = (id, min, sec, fullTime) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((el) => el.partNum === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, min, sec, fullTime };
    this.newTimerState([
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ]);
  };

  newTimerState(state) {
    this.setState(() => {
      return {
        todoData: state,
      };
    });
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.partNum === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "completed"),
      };
    });
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, +min, +sec);
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
      const idx = todoData.findIndex((el) => el.partNum === id);

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArr };
    });
  };

  filterSetState = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { todoData, filter } = this.state;
    const taskNotCompletedCount = this.state.todoData.filter(
      (el) => !el.completed
    ).length;

    const filtered =
      filter === "all"
        ? todoData
        : todoData.filter((el) =>
            filter === "completed" ? el.completed : !el.completed
          );
    return (
      <section className="todoapp">
        <Header onItemAdd={this.addItem} setTimer={this.setUserTime} />
        <section className="main">
          <TaskList
            todos={filtered}
            onDelete={this.deleteItem}
            onToggle={this.onToggleDone}
            updateTimer={this.updateTimeFormTimerTask}
          />
        </section>
        <Footer
          onFilter={this.filterSetState}
          taskToComplete={taskNotCompletedCount}
          clearAll={this.clearCompleted}
        />
      </section>
    );
  }
}
