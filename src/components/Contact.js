import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import './Contact.css'

const Contact = () => {
  let form = {
    name: '',
    email: '',
    message: ''
  }
  const [formData, setFormData] = useState(form)
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8080/api/v1/contact', formData)
      setShowAlert(true)
      setFormData(form)
    }
    catch (error) {
      console.error('Error submitting contact form:', error)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Contact Information</h2>
          <p>
            <strong>Developer:</strong> Serhii Lisnychyi, КПІ-ЗПІ-зп01
          </p>
          <p>
            <strong>Faculty:</strong> Факультет інформатики та обчислюваної техніки
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Contact Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button style={{ marginTop: '10px' }} variant="primary" type="submit">
              Submit
            </Button>

          </Form>
          {showAlert && (
            <Alert style={{ marginTop: '10px' }} variant="success" onClose={() => setShowAlert(false)} dismissible>
              Your message was submitted. I will answer you soon.
            </Alert>
          )}

        </Col>
      </Row>
    </Container>
  )
}

export default Contact
