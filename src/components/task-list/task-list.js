import {} from "react";

import Task from "../task";

const TaskList = ({ todos, onDelete, onToggle, updateTimer }) => {
  const elements = todos.map((el) => {
    const { ...itemProps } = el;

    let classNames = "";
    if (el.completed) {
      classNames += " completed";
    }
    return (
      <li key={el.partNum} className={classNames}>
        <Task
          {...itemProps}
          onDelete={() => onDelete(el.partNum)}
          onLabel={() => onToggle(el.partNum)}
          timerProps={updateTimer}
        />
        <input type="text" className="edit" placeholder="Editing task" />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
