import React from "react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import './Header.css';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = { logout };


class HeaderClass extends React.Component {
  
  render(){
    const { isLoggedIn, navigate, logout } = this.props;
    const buttonClass = this.props.isMenuOpen ? "menu__icon icon-menu menu-open" : "menu__icon icon-menu ";

    return <header className="Header">
      <div className="HeaderСontainer">
        <div className="HeaderActions">
          {isLoggedIn &&
            <button type="button" 
              className={buttonClass}
              onClick={this.props.onToggleMenu}
            >
              <span></span>
            </button>
          }
        </div>
        <div className="HeaderInfo"></div>
        <div className="HeaderLog">
          {!isLoggedIn && 
            <IconButton aria-label="Login" color="primary" onClick={() => navigate('/')}>
              <LoginIcon fontSize="large" style={{ color: '#FFFFFF' }}/>
            </IconButton>
          }
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

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderClass);

export default function HeaderWithNavigate(props) {
  const navigate = useNavigate();

  return <Header {...props} navigate={navigate} />;
}
