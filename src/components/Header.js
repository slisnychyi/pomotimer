import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { logoutUser } from './store/actions'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((state) => state.userId)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <Navbar bg="light" expand="lg" className="px-4">
      <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>Pomodoro Time Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          {userId && (
            <>
              <Nav.Link href="/tasks/today">Tasks</Nav.Link>
              <Nav.Link href="/statistics">Statistics</Nav.Link>
            </>
          )}
          <Nav.Link href="/contact">Contact</Nav.Link>
          {userId && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          {!userId && <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
