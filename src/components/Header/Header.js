import React from "react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';

class Header extends React.Component{
  static contextType = AuthContext;

  render(){
    const { isLoggedIn, logout } = this.context;
    const buttonClass = this.props.isMenuOpen ? "menu__icon icon-menu menu-open" : "menu__icon icon-menu ";

    return <header className="Header">
      <div className="HeaderСontainer">
        <div className="HeaderActions">
          <button type="button" 
            className={buttonClass}
            onClick={this.props.onToggleMenu}
          >
            <span></span>
          </button>
        </div>
        <div className="HeaderInfo"></div>
        <div className="HeaderLog">
          {isLoggedIn && 
            <IconButton aria-label="Logout" color="primary" onClick={logout}>
              <LogoutIcon fontSize="large" style={{ color: '#FFFFFF' }}/>
            </IconButton>
          }
        </div>
      </div>
    </header>
  }
}

export default Header;
