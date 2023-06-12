import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import axios from 'axios'
import { format, addDays } from 'date-fns'
import './TodoList.css'
import { useSelector } from 'react-redux'

const TodoList = ({dateRange}) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [taskNotes, setTaskNotes] = useState('')
  const [taskDate, setTaskDate] = useState(null)
  const [plannedPomodoros, setPlannedPomodoros] = useState(0)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editTask, setEditTask] = useState(null)
  const [validationError, setValidationError] = useState('')
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if(dateRange === 'nextdays') {
          const response = await axios.get(`http://localhost:8080/api/v1/tasks/nextdays?userId=${userId}`)
          setTasks(response.data)
        } else {
          let date = format(getDate(dateRange),'yyyy-MM-dd' )
          const response = await axios.get(`http://localhost:8080/api/v1/tasks/date?date=${date}&userId=${userId}`)
          setTasks(response.data)
        }
      }
      catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [userId, dateRange])

  const getDate = (dateRange) => {
    if (dateRange === 'today') {
      return new Date();
    } else {
      return addDays(new Date(), 1);
    }
  }

  const handleAddTask = async () => {
    if (newTask.trim() === '' || taskDate === null) {
      setValidationError('Please enter a task name and select a date.')
      return
    }
    if (plannedPomodoros === null || plannedPomodoros === 0) {
      setValidationError('Please enter valid planned pomodoros.')
      return
    }

    if (editTask) {
      await axios.put(`http://localhost:8080/api/v1/tasks/${editTask.id}?userId=${userId}`,{
        ...editTask,
        name: newTask,
        date: moment(taskDate).format('YYYY-MM-DD'),
        pomodoros: plannedPomodoros
      })
      const updatedTasks = tasks.map((task) =>
        task.id === editTask.id ?
          {
            ...task,
            name: newTask,
            date: moment(taskDate)
              .format('YYYY-MM-DD'),
            pomodoros: plannedPomodoros
          } :
          task
      )
      setTasks(updatedTasks)
      setEditTask(null)
    } else {
      const response = await axios.post(`http://localhost:8080/api/v1/tasks?userId=${userId}`, {
        id: Date.now(),
        name: newTask,
        date: moment(taskDate).format('YYYY-MM-DD'),
        pomodoros: plannedPomodoros,
        completedPomodoros: 0,
        taskNotes: taskNotes,
        completed: false,
      });
      if(new Date().toDateString() === taskDate.toDateString()) {
        setTasks([...tasks, response.data])
      }
    }

    setNewTask('')
    setTaskDate(null)
    setPlannedPomodoros(0)
    setValidationError('')
    setTaskNotes('')
  }

  const handleTaskComplete = async (taskId) => {
    const editTask = tasks.find(e => e.id === taskId)
    if(editTask) {
      await axios.put(`http://localhost:8080/api/v1/tasks/${editTask.id}?userId=${userId}`, {
        ...editTask,
        completed: !editTask.completed
      })
    }
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ?
        {
          ...task,
          completed: !task.completed
        } :
        task
    )
    setTasks(updatedTasks)
    cleanNotes()
  }

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId)
    if (taskToEdit) {
      setNewTask(taskToEdit.name)
      setTaskDate(moment(taskToEdit.date).toDate())
      setPlannedPomodoros(taskToEdit.pomodoros)
      setEditTask(taskToEdit)
    }
  }

  const handleCancelEdit = () => {
    setNewTask('')
    setTaskDate(null)
    setPlannedPomodoros(null)
    setEditTask(null)
    setValidationError('')
  }

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:8080/api/v1/tasks/${taskId}?userId=${userId}`);
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    cleanNotes()
  }

  const handleTaskCardClick = (taskId) => {
    const task = tasks.find((task) => task.id === taskId)
    if (task) {
      setSelectedTask(task)
      setTaskNotes(task.taskNotes)
    }
    setValidationError('')
  }

  const handleTaskNotesChange = (e) => {
    setTaskNotes(e.target.value)
    if (selectedTask) {
      setSelectedTask({
        ...selectedTask,
        taskNotes: e.target.value
      })
    }
  }

  const handleUpdateTask = async () => {
    if (selectedTask) {
      await axios.put(`http://localhost:8080/api/v1/tasks/${selectedTask.id}?userId=${userId}`,{
        ...selectedTask,
        taskNotes: taskNotes
      })
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ?
          {
            ...task,
            taskNotes: taskNotes
          } :
          task
      )
      setTasks(updatedTasks)
      cleanNotes()
    }
  }

  const cleanNotes = () => {
    if (editTask == null) {
      setTaskNotes('')
      setSelectedTask(null)
    }
  }

  const handlePomodorosChange = async (taskId, increment) => {
    const editTask = tasks.find(e => e.id === taskId)
    if(editTask) {
      await axios.put(`http://localhost:8080/api/v1/tasks/${editTask.id}?userId=${userId}`, {
        ...editTask,
        completedPomodoros: Math.max(0, editTask.completedPomodoros + (increment ? 1 : -1))
      })
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            completedPomodoros: Math.max(0, task.completedPomodoros + (increment ? 1 : -1)),
          }
          : task
      )
    )
  }

  return (
    <Container>
      <Row>
        <Col md={6} >
          <Form>
            <div>
              <Form.Group controlId="newTask">
                <br/>
                <Form.Label>New Task</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task name"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onClick={cleanNotes}
                  style={{ width: '80%' }}
                />
              </Form.Group>
            </div>
            <Form.Group controlId="taskDate">
              <div style={{
                display: 'flex',
                alignItems: 'flex-start '
              }}>
                <Form.Label style={{ marginRight: '150px' }}>Task Date</Form.Label>
                <br/>
                <Form.Label>Pomodoros</Form.Label>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <div style={{
                  width: '50%',
                  marginRight: '10px'
                }}>
                  <DatePicker
                    selected={taskDate}
                    onChange={(date) => setTaskDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    className="form-control"
                  />
                </div>
                <div>
                  <Form.Control
                    type="number"
                    placeholder="Pomodoros"
                    value={plannedPomodoros}
                    onChange={(e) => setPlannedPomodoros(e.target.value)}
                    style={{ width: '115px' }}
                  />
                </div>
              </div>
            </Form.Group>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '20px',
            }}>
              <Button variant="primary" onClick={handleAddTask}>
                {editTask ? 'Update Task' : 'Add Task'}
              </Button>
              {editTask && (
                <Button variant="danger" onClick={handleCancelEdit} className="ml-2" style={{ marginLeft: '10px' }}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
          {validationError && <Alert style={{ marginTop: '10px' }} variant="danger">{validationError}</Alert>}
        </Col>
        <Col md={6} >
          <Form>
            <Form.Group controlId="taskNotes">
              <div style={{ marginBottom: '10px' }}>
                <br/>
                <Form.Label>Task Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter task notes"
                  value={taskNotes}
                  onChange={handleTaskNotesChange}
                  style={{
                    width: '80%',
                    height: '120px'
                  }}
                />
              </div>
            </Form.Group>
            {selectedTask && (
              <Button variant="primary" onClick={handleUpdateTask}>
                Update Task Notes
              </Button>
            )}
          </Form>
        </Col>
      </Row>
      <h3 style={{
        fontFamily: 'Roboto\', sans-serif',
        textAlign: 'center',
        marginTop: '10px',
        fontWeight: 'bold'
      }}>
        Task List
      </h3>
      {tasks.map((task) => (
        <Row key={task.id}>
          <Col md={11}>
            <Card key={task.id}
              className={`task-card ${task.completed ? 'completed-task' : ''} ${
                selectedTask && selectedTask.id === task.id ? 'selected' : ''
              }`}
              style={{ marginBottom: '10px' }}
              onClick={() => handleTaskCardClick(task.id)}
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
                    <div className="task-info">
                      <Card.Text className="task-name">{task.name}</Card.Text>
                      <div className="task-details">
                        <div className="task-date">Date: {task.date}</div>
                        <div className="task-pomodoros">
                          <span>Pomodoros: {task.pomodoros}</span>
                          <span>Completed: {task.completedPomodoros}</span>
                          <Button variant="link" onClick={() => handlePomodorosChange(task.id, true)}>
                            +
                          </Button>
                          <Button variant="link" onClick={() => handlePomodorosChange(task.id, false)}>
                            -
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-actions">
                    <Button variant="link" onClick={() => handleEditTask(task.id)}>
                      Edit
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      ))}
    </Container>
  )
}

export default TodoList
