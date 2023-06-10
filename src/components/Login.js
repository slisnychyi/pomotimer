import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from './store/actions';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(false);

    try {
      await dispatch(loginUser(email, password));
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setLoginError(true);
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      {loginError && <Alert variant="danger">Invalid email or password</Alert>}
      <Form onSubmit={handleLogin}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" size="sm" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" size="sm" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
