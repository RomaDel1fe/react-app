import React from "react"
import { NavLink, useMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import './Sidebar.css'

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const CustomNavLink = ({ to, children }) => {
  const match = useMatch(to);

  return <NavLink className={match ? 'NavItem active' : 'NavItem'} to={to}>{children}</NavLink>
}
class Sidebar extends React.Component{
  render(){
    const { isLoggedIn } = this.props;
    const sidebarClass = this.props.isMenuOpen ? "Sidebar active" : "Sidebar ";
    return <aside className={sidebarClass}>
    {isLoggedIn &&
      <nav className="NavList">
        <CustomNavLink to="/emoji">Emoji Voting</CustomNavLink>
        <CustomNavLink to="/todo">Todo List</CustomNavLink>
        <CustomNavLink to="/users">Users List</CustomNavLink>
        <CustomNavLink to="/contacts">Contacts</CustomNavLink>
      </nav>
    }
    </aside>
  }
}

export default connect(mapStateToProps, null)(Sidebar);