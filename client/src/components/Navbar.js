import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse">
      <ul className="nav navbar-nav">
        <li>
          <NavLink exact activeClassName='active' to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/login'>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
