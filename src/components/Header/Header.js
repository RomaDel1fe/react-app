import React from "react";
import './Header.css'

class Header extends React.Component{

  render(){
    const buttonClass = this.props.isMenuOpen ? "menu__icon icon-menu menu-open" : "menu__icon icon-menu ";
    return <header className="Header">
      <div className="HeaderСontainer">
      <div class="HeaderActions">
        <button type="button" 
          className={buttonClass}
          onClick={this.props.onToggleMenu}
        >
          <span></span>
        </button>
      </div>
      </div>
    </header>
  }
}

export default Header;