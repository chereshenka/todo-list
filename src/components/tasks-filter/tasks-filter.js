import PropTypes from 'prop-types';

const TasksFilter = ({ onFilter }) => {
  TasksFilter.propTypes = {
    onFilter: PropTypes.func,
  };

  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={() => onFilter('all')}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => onFilter('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => onFilter('completed')}>Completed</button>
      </li>
    </ul>
  );
};

export default TasksFilter;
