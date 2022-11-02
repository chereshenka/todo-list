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
    id: null,
    timer: null,
  };

  componentDidMount() {
    let { partNum } = this.props;
    this.setState({
      id: partNum,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  degreeseTimer = () => {
    let localTime = this.props.fullTime;
    let sec = localTime % 60;
    let min = Math.floor(localTime / 60);
    if (localTime > 0) {
      this.props.timerProps(this.state.id, min, sec, --localTime);
    }
  };

  timerControlers = (e) => {
    let button = e.target;
    if (button.className === "icon-timer icon-pause") {
      this.props.timerProps(
        this.state.id,
        this.props.min,
        this.props.sec,
        this.props.fullTime
      );
      this.setState({ timer: clearInterval(this.state.timer) });
    }
    if (button.className === "icon-timer icon-play") {
      if (!this.state.timer) {
        this.setState({ timer: setInterval(this.degreeseTimer, 1000) });
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
              id={`${id}icon-play`}
              className="icon-timer icon-play"
              onClick={this.timerControlers}
            ></button>
            <button
              id={`${id}icon-pause`}
              className="icon-timer icon-pause"
              onClick={this.timerControlers}
            ></button>
            <span className="time">
              {this.props.min}:{this.props.sec}
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
