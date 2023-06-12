import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import './CompletedTasks.css'
import { useSelector } from 'react-redux'

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([])
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/tasks/completed?userId=${userId}`)
        setCompletedTasks(response.data)
      }
      catch (error) {
        console.error('Error fetching completed tasks:', error)
      }
    }
    fetchCompletedTasks()
  }, [userId])

  // Group tasks by date
  const groupedTasks = completedTasks.reduce((groups, task) => {
    const date = task.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(task)
    return groups
  }, {})

  return (
    <Container fluid>
      <div className="completed-tasks-container">
        <h2>Completed Tasks</h2>
        {Object.entries(groupedTasks)
          .map(([date, tasks]) => (
            <div key={date}>
              <h3 className="date-heading">{date}</h3>

              {tasks.map((task) => (
                <Row key={task.id}>
                  <Col md={6} key={task.id}>
                    <Card className={`task-card ${task.pomodoros >= task.completedPomodoros ? 'green' : 'yellow'}`}>
                      <Card.Body>
                        <div className="task-details">
                          <div className="task-name">{task.name}</div>
                          <div className="task-date">Date: {task.date}</div>
                          <div className="task-pomodoros">
                            <span>Planned Pomodoros: {task.pomodoros}</span>
                            <span>Completed Pomodoros: {task.completedPomodoros}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Form.Group key={task.id} className="task-note-group">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={task.taskNotes}
                        readOnly
                        className="task-notes"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              ))}
            </div>
          ))}
      </div>
    </Container>
  )
}

export default CompletedTasks
