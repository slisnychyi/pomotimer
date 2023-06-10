import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar'
import TodoList from './TodoList'
import PomodoroTimer from './PomodoroTimer'
import Timer from './Timer'

const Tasks = ({dateRange}) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Sidebar />
        </Col>
        <Col style={{ maxHeight: '800px', overflowY: 'auto' }} md={6} className="task-list">
          <TodoList dateRange = {dateRange}/>
        </Col>
        <Col md={4} className="timer">
          {/*<PomodoroTimer/>*/}
          <Timer/>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
