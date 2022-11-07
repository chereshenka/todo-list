import { useState } from "react";

const Header = ({ onItemAdd }) => {
  const initialState = {
    description: "",
    min: "",
    sec: ""
  };

  const [taskData, setTaskData] = useState(initialState);

  const onLabelChange = (e) => {
    let description = e.target.value;
    setTaskData({ ...taskData, description });
  };

  const getMinutes = (e) => {
    let min = e.target.value;
    if (min >= 60) min = 59;
    setTaskData({ ...taskData, min });
  };

  const getSeconds = (e) => {
    let sec = e.target.value;
    if (sec > 60) sec = 60;
    setTaskData({ ...taskData, sec });
  };

  const onSubmit = (e) => {
    const { description, min, sec } = taskData;
    if (description && min && sec) {
      e.preventDefault();
      if (description !== "") {
        onItemAdd(description, min, sec);
        setTaskData(initialState);
      }
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form id="new-task" className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          form="new-task"
          className="new-todo"
          required
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={taskData.description}
        />
        <input
          type="number"
          form="new-task"
          maxLength="2"
          className="new-todo-form__timer"
          placeholder="Min"
          min={0}
          max={59}
          required
          pattern="/\d+/"
          inputMode="numeric"
          onChange={getMinutes}
          value={taskData.min}
        />
        <input
          type="number"
          form="new-task"
          maxLength="2"
          className="new-todo-form__timer"
          placeholder="Sec"
          min={0}
          max={60}
          required
          pattern="/\d+/"
          inputMode="numeric"
          onChange={getSeconds}
          value={taskData.sec}
        />
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </header>
  );
};

export default Header;
