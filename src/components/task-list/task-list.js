import { Component } from "react";
import PropTypes from "prop-types";

import Task from "../task";

export default class TaskList extends Component {
  static propTypes = {
    todos: PropTypes.array,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func
  };

  render() {
    const { todos, onDelete, onToggle, updateTimer } = this.props;

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
  }
}
