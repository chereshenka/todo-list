import { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

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

  state = {
    min: null,
    sec: null,
    timer: null,
  };
  componentDidMount() {
    localStorage.setItem(
      this.props.partNum,
      this.props.min * 60 + this.props.sec
    );
    this.degreeseTimer();
  }

  componentWillUnmount() {
    localStorage.removeItem(this.props.partNum);
    clearInterval(this.interval);
  }

  degreeseTimer = () => {
    const localTime = localStorage.getItem(this.props.partNum);
    let sec = localTime % 60;
    let min = Math.floor(localTime / 60);
    this.setState({
      min,
      sec,
    });
  };

  startTaskTimer = () => {
    let localTime = localStorage.getItem(this.props.partNum);
    if (localTime > 0) {
      localStorage.setItem(this.props.partNum, --localTime);
      this.degreeseTimer();
    }
  };
  pauseTaskTimer = (e) => {
    let button = e.target;
    if (button.className === "icon-timer icon-pause") {
      console.log("pause");
      clearInterval(this.state.timer);
      this.setState({ timer: "" });
    }
    if (button.className === "icon-timer icon-play") {
      console.log("start");
      if (!this.state.timer) {
        this.setState({ timer: setInterval(this.startTaskTimer, 1000) });
        this.state.timer;
      }
    }
  };

  render() {
    const { description, completed, date, onLabel, onDelete } = this.props;
    const id = this.props.partNum;
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
          <span className="timer-buttons">
            <button
              id={id}
              className="icon-timer icon-play"
              onClick={this.pauseTaskTimer}
            ></button>
            <button
              id={id}
              className="icon-timer icon-pause"
              onClick={this.pauseTaskTimer}
            ></button>
            <span className="time">
              {this.state.min}:{this.state.sec}
            </span>
          </span>
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
