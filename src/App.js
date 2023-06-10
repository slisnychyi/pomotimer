import Header from './components/Header'
import { Button, Alert, Breadcrumb, Card, Form, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Wrapper from './components/Wrapper'
import About from './components/About'
import Tasks from './components/Tasks'
import CompletedTasks from './components/CompletedTasks'
import CompletedTasksWrapper from './components/CompletedTasksWrapper'
import Contact from './components/Contact'
import Statistics from './components/Statistics'
import Login from './components/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Wrapper />} >
          <Route path="/" element={<About />} />
          <Route path="/tasks/today" element={<Tasks dateRange="today" />} />
          <Route path="/tasks/tomorrow" element={<Tasks dateRange="tomorrow" />} />
          <Route path="/tasks/nextdays" element={<Tasks dateRange="nextdays" />} />
          <Route path="/tasks/completed" element={<CompletedTasksWrapper />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {/*<Header/>*/}

    </div>

  )
}

export default App
