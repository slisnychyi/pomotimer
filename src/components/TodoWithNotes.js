import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './TodoList.css'; // Import custom CSS file for styling

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [taskNotes, setTaskNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '' || taskDate === null) {
      setValidationError('Please enter a task name and select a date.');
      return;
    }

    if (editTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTask.id ? { ...task, name: newTask, date: taskDate } : task
      );
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      const task = {
        id: Date.now(),
        name: newTask,
        date: moment(taskDate).format('YYYY-MM-DD'),
        notes: '',
        completed: false,
      };
      setTasks([...tasks, task]);
    }

    setNewTask('');
    setTaskDate(null);
    setTaskNotes('');
    setValidationError('');
  };

  const handleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTask(taskToEdit.name);
      setTaskDate(moment(taskToEdit.date).toDate());
      setTaskNotes(taskToEdit.notes);
      setEditTask(taskToEdit);
    }
  };

  const handleCancelEdit = () => {
    setNewTask('');
    setTaskDate(null);
    setTaskNotes('');
    setEditTask(null);
    setValidationError('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleSaveNotes = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? { ...task, notes: taskNotes } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="newTask">
              <Form.Label>New Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ width: '80%' }}
              />
            </Form.Group>
            <Form.Group controlId="taskDate">
              <Form.Label>Task Date</Form.Label>
              <br />
              <div style={{ width: '50%' }}>
                <DatePicker
                  selected={taskDate}
                  onChange={(date) => setTaskDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  className="form-control"
                />
              </div>
            </Form.Group>
            <Button variant="primary" onClick={handleAddTask}>
              {editTask ? 'Update Task' : 'Add Task'}
            </Button>
            {editTask && (
              <Button variant="secondary" onClick={handleCancelEdit} className="ml-2">
                Cancel
              </Button>
            )}
            {validationError && <Alert variant="danger">{validationError}</Alert>}
          </Form>
          <h3>Task List</h3>
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`task-card ${task.completed ? 'completed-task' : ''}`}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => handleEditTask(task.id)}
            >
              <Card.Body>
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id={`task-checkbox-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleTaskComplete(task.id)}
                    className="task-checkbox"
                  />
                  <div className="flex-grow-1">
                    <Card.Text className="task-name">{task.name}</Card.Text>
                    <Card.Text className="task-date">Date: {task.date}</Card.Text>
                  </div>
                  <div>
                    <Button variant="link" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
              {editTask && editTask.id === task.id && (
                <Card.Footer>
                  <Form.Group controlId="taskNotes">
                    <Form.Label>Task Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={taskNotes}
                      onChange={(e) => setTaskNotes(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleSaveNotes}>
                    Save Notes
                  </Button>
                </Card.Footer>
              )}
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
