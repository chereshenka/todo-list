import { useState } from "react";
import { v4 as uuid } from "uuid";

import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

const App = () => {
  const createTodoItem = (description, min, sec) => {
    return {
      description: description,
      completed: false,
      partNum: uuid(),
      date: Date.now(),
      min: +min || 0,
      sec: +sec || 0,
      fullTime: min * 60 + sec,
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem("Time", 7, 11),
    createTodoItem("Abs", 2, 40),
    createTodoItem("OnA", 0, 2),
  ]);
  const [filter, setFilter] = useState("all");

  const updateTimeFormTimerTask = (id, min, sec, fullTime) => {
    const idx = todoData.findIndex((el) => el.partNum === id);
    const oldItem = todoData[idx];
    setTodoData((todoData) => [
      ...todoData.slice(0, idx),
      { ...oldItem, min, sec, fullTime },
      ...todoData.slice(idx + 1),
    ]);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.partNum === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData((data) => toggleProperty(data, id, "completed"));
  };

  const addItem = (text, min, sec) => {
    setTodoData((todoData) => [...todoData, createTodoItem(text, +min, +sec)]);
  };

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.completed));
  };

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.partNum === id);
      return [...data.slice(0, idx), ...data.slice(idx + 1)];
    });
  };

  const filterSetState = (value) => {
    setFilter(value);
  };
  let taskNotCompletedCount = todoData.filter((el) => !el.completed).length;

  const filtered =
    filter === "all"
      ? todoData
      : todoData.filter((el) =>
          filter === "completed" ? el.completed : !el.completed,
        );

  return (
    <section className="todoapp">
      <Header onItemAdd={addItem} />
      <section className="main">
        <TaskList
          todos={filtered}
          onDelete={deleteItem}
          onToggle={onToggleDone}
          updateTimer={updateTimeFormTimerTask}
        />
      </section>
      <Footer
        onFilter={filterSetState}
        taskToComplete={taskNotCompletedCount}
        clearAll={clearCompleted}
      />
    </section>
  );
};

export default App;
