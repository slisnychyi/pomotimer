import React from 'react';
import { Carousel, Container, Image } from 'react-bootstrap'
import './About.css'; // Import custom CSS file for styling

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
              src="https://nova-live.imgix.net//How%20Good%20Is%20Your%20Time%20Management-708fe8f4-8cf6-4246-b8dc-b04bd2624e92.jpg?"
              alt="Carousel Image"
              className="d-block w-100 carousel-item-image"
            />
            <Carousel.Caption>
              <h3>Manage your time</h3>
              <p>You are anle to manage your daily tasks more efficient</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second Slide</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third Slide</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
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
