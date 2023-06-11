import React from "react"
import { NavLink, useMatch } from 'react-router-dom';
import './Sidebar.css'

const CustomNavLink = ({ to, children }) => {
  const match = useMatch(to);

  return <NavLink className={match ? 'NavItem active' : 'NavItem'} to={to}>{children}</NavLink>
}
class Sidebar extends React.Component{
  render(){
    const sidebarClass = this.props.isMenuOpen ? "Sidebar active" : "Sidebar ";
    return <aside className={sidebarClass}>
      <nav className="NavList">
      <CustomNavLink to="/emoji">Emoji Voting</CustomNavLink>
        <CustomNavLink to="/todo">TodoList</CustomNavLink>
      </nav>
    </aside>
  }
}

export default Sidebar;