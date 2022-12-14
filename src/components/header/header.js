import { Component } from "react";
import PropTypes from "prop-types";

export default class Header extends Component {
  static propTypes = {
    onItemAdd: PropTypes.func,
  };

  state = {
    description: "",
    min: "",
    sec: "",
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  getMinutes = (e) => {
    let min = e.target.value;
    if (min >= 60) min = 59;
    this.setState({
      min,
    });
  };

  getSeconds = (e) => {
    let sec = e.target.value;
    if (sec > 60) sec = 60;
    this.setState({
      sec,
    });
  };

  onSubmit = (e) => {
    const { onItemAdd } = this.props;
    const { description, min, sec } = this.state;
    if (description && min && sec) {
      e.preventDefault();
      if (description !== "") {
        onItemAdd(description, min, sec);
        this.setState({
          description: "",
          min: "",
          sec: "",
        });
      }
    }
  };

  render() {
    const { description, min, sec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form id="new-task" className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            form="new-task"
            className="new-todo"
            required
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={description}
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
            onChange={this.getMinutes}
            value={min}
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
            onChange={this.getSeconds}
            value={sec}
          />
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      </header>
    );
  }
}
