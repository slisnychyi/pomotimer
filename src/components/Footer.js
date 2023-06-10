import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col lg={6} className="text-lg-left text-center">
            <span className="text-muted">
              &copy; {new Date().getFullYear()} Serhii Lisnychyi
            </span>
          </Col>
          <Col lg={6} className="text-lg-right text-center">
            <p className="text-center">
              Learn more about the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">Pomodoro Technique</a> on Wikipedia.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
