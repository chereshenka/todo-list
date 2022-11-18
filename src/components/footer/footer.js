import PropTypes from "prop-types";

import TasksFilter from "../tasks-filter";

const Footer = ({ onFilter, taskToComplete, clearAll }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{taskToComplete} items left</span>
      <TasksFilter onFilter={onFilter} />
      <button className="clear-completed" onClick={clearAll}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.propTypes = {
  onFilter: PropTypes.func,
  taskToComplete: PropTypes.number,
  clearAll: PropTypes.func,
};

export default Footer;
