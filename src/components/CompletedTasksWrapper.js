import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import CompletedTasks from './CompletedTasks';

const CompletedTasksWrapper = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Sidebar />
        </Col>
        <Col style={{ maxHeight: '800px', overflowY: 'auto' }} md={10} className="completed-task-list">
          <CompletedTasks />
        </Col>
      </Row>
    </Container>
  );
};

export default CompletedTasksWrapper;
