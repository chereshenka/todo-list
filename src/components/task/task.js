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
    fullTime: null,
    timer: null,
  };
  componentDidMount() {
    const { min, sec } = this.props;
    console.log(min, "minute", sec, "second");
    this.setState({
      min: min,
      sec: sec,
      fullTime: min * 60 + sec,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  degreeseTimer = () => {
    const localTime = this.state.fullTime;
    let sec = localTime % 60;
    let min = Math.floor(localTime / 60);
    this.setState({
      min,
      sec,
    });
  };

  startTaskTimer = () => {
    let localTime = this.state.fullTime;
    if (localTime > 0) {
      this.setState({ fullTime: --localTime });
      this.degreeseTimer();
    }
  };

  timerControlers = (e) => {
    let button = e.target;
    if (button.className === "icon-timer icon-pause") {
      this.setState({ timer: clearInterval(this.state.timer) });
    }
    if (button.className === "icon-timer icon-play") {
      if (!this.state.timer) {
        this.setState({ timer: setInterval(this.startTaskTimer, 1000) });
        this.state.timer;
      }
    }
  };

  render() {
    const { description, completed, date, onLabel, onDelete } = this.props;
    const id = this.props.partNum;
    console.log(this.props);
    // this.setState({ min: this.props.min });
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
              onClick={this.timerControlers}
            ></button>
            <button
              id={id}
              className="icon-timer icon-pause"
              onClick={this.timerControlers}
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
