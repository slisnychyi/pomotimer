import React from 'react';
import { Carousel, Container, Image } from 'react-bootstrap'
import './About.css';

const About = () => {
  return (
    <div className="about-container">

      <Container>
        <p className="about-text">
          This app is designed to help you boost productivity and manage your time effectively. Enjoy your productive sessions!
        </p>
      </Container>

      <Container className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <Image
              src="https://prod-website-cdn.studysmarter.de/sites/2/uk/Pomodoro-Technique2.webp"
              alt="Carousel Image"
              className="d-block w-100"
              style={{ objectFit: "cover", height: "500px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://uploads-ssl.webflow.com/5f822df699580bf215100720/61a995080421b156be4456ae_Cover%20(1)-p-1600.png"
              alt="Second slide"
              style={{ objectFit: "cover", height: "500px" }}
            />
            <Carousel.Caption>
              <h3>Manage your time</h3>
              <p>You are able to manage your daily tasks more efficiently</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://media.fourdayweek.io/files/the-pomodoro-method-how-to-boost-your-productivity-with-tomato-timers-KgTZg.jpeg"
              alt="Third slide"
              style={{ objectFit: "cover", height: "500px" }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container>
        <p className="about-text-bottom">
          Pomodoro Time Management is a time management app based on the Pomodoro Technique. The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
        </p>
      </Container>

      <Container fluid>
        <ul className="about-list">
          <li>Improve focus and concentration</li>
          <li>Enhance time management skills</li>
          <li>Increase productivity and efficiency</li>
        </ul>
      </Container>

    </div>
  );
};

export default About;
