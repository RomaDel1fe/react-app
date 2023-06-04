import { Component } from "react"
import PropTypes from 'prop-types';
import './Button.css'

class Button extends Component{
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary']),
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    submit: PropTypes.bool,
  }

  static defaultProps = {
    type: 'primary',
    submit: false,
  }
  render(){
    let buttonClass = "Button";
    
    switch(this.props.type) {
      case "primary":
        buttonClass += " Button__primary";
        break;
      case "secondary":
        buttonClass += " Button__secondary";
        break;
      default:
        break;
    }
    return <button 
      className={buttonClass} 
      onClick={this.props.onClick} 
      type={this.props.submit ? "submit" : "button"}
    >
      {this.props.label}
    </button>;
  }
}
export default Button;