import React, { Component } from "react";
import PropTypes from "prop-types";
import './Input.css';

class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    type: "text",
    value: "",
    placeholder: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    return (
      <input 
        className="Input" 
        type={this.props.type} 
        value={this.state.value} 
        onChange={this.handleChange} 
        placeholder={this.props.placeholder} 
      />
    );
  }
}

export default Input;
