import { Component } from "react";
import PropTypes from "prop-types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default class Task extends Component {
  static propTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
    date: PropTypes.number,
    onLabel: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    date: "5 min ago",
  };

  render() {
    const { description, completed, date, onLabel, onDelete } = this.props;
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onLabel}
          checked={completed}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">
            {formatDistanceToNow(date, {
              includeSeconds: true,
              addSuffix: true,
            })}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
    );
  }
}
