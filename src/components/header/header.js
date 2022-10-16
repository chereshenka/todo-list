import { Component } from "react";
import PropTypes from "prop-types";

export default class Header extends Component {
  static propTypes = {
    onItemAdd: PropTypes.func,
  };

  state = {
    description: "",
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onItemAdd } = this.props;
    const { description } = this.state;
    e.preventDefault();
    if (description !== "") {
      onItemAdd(description);
      this.setState({
        description: "",
      });
    }
  };

  render() {
    const { description } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={description}
          />
        </form>
      </header>
    );
  }
}
