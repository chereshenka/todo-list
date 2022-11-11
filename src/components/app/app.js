import { useState } from "react";

import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

const App = () => {
  let maxId = 100;

  const initialState = [
    {
      description: "Time",
      completed: false,
      partNum: maxId,
      date: Date.now(),
      min: 1,
      sec: 1,
      fullTime: 1 * 60 + 1,
    },
    {
      description: "Sleep",
      completed: false,
      partNum: maxId + 101,
      date: Date.now(),
      min: 2,
      sec: 41,
      fullTime: 2 * 60 + 41,
    },
    {
      description: "Sombrero",
      completed: false,
      partNum: maxId + 102,
      date: Date.now(),
      min: 7,
      sec: 3,
      fullTime: 7 * 60 + 3,
    },
  ];

  const [todoData, setTodoData] = useState(initialState);
  const [filter, setFilter] = useState("all");

  const createTodoItem = (description, min, sec) => {
    const item = {
      description: description,
      completed: false,
      partNum: ++maxId,
      date: Date.now(),
      min: +min || 0,
      sec: +sec || 0,
      fullTime: min * 60 + sec,
    };
    return item;
  };

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
    setTodoData(toggleProperty(todoData, id, "completed"));
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, +min, +sec);
    setTodoData((todoData) => [...todoData, newItem]);
  };

  const clearCompleted = () => {
    const cleanArr = todoData.filter((el) => !el.completed);
    setTodoData(cleanArr);
  };

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.partNum === id);
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArr);
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
