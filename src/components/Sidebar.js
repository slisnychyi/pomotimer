import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Tasks.css';

const Sidebar = () => {
  return (
    <Nav className="flex-column">
      <Nav.Item>
        <NavLink to="/tasks/today" className="nav-link" activeclassname="active">Today</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/tasks/tomorrow" className="nav-link" activeclassname="active">Tomorrow</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/tasks/nextdays" className="nav-link" activeclassname="active">Next 7 Days</NavLink>
      </Nav.Item>
      {/*<div style={{ display: 'flex', alignItems: 'center' }}>*/}
      {/*  <hr style={{ borderTop: '2px solid black', margin: '10px 0', width: '50%' }} />*/}
      {/*</div>*/}
      <div className="divider"></div>
      <Nav.Item>
        <NavLink to="/tasks/completed" className="nav-link" activeclassname="active">Completed</NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
