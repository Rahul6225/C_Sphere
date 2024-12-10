import React from 'react';
import Footer from '../Common/Footer';
import '../App.css'
import '../Styles/Home.css';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className="home-container">
        <div className="text-section">
          <h1 className="heading-1">Welcome To</h1>
          <h1 className="heading-2">Campus Sphere</h1>
        </div>
        <div className="image-section">
          <img src="/images/WelcomePagePic.png" alt="Students in Library" />
        </div>
      </div>

      <section className="courses-section">
        <h2>Quizes</h2>
        <div className="courses-container">
          <div className="course-card">
            <img src="/images/WebDevLogo.png" alt="Web Development" />
            <h3>Web Development</h3>
            <Link to="/quiz-Web_dev"><button className="ria-button">Start</button></Link>
          </div>
          <div className="course-card">
            <img src="/images/MLlogo.png" alt="Machine Learning" />
            <h3>Machine Learning</h3>
            <Link to="/quiz-ML"><button className="ria-button">Start</button></Link>
          </div>
          <div className="course-card">
            <img src="/images/CppLogo.png" alt="C++ Programming" />
            <h3>C++ Programming</h3>
            <Link to="/quiz-Cpp"><button className="ria-button">Start</button></Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats">
          <h2>500+</h2>
          <p>Happy Students</p>
        </div>
        <div className="stats">
          <h2>100%</h2>
          <p>Attendance Rate</p>
        </div>
        <div className="stats">
          <h2>50+</h2>
          <p>Exciting Events</p>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Empower Your Teaching Journey Today!</h2>
        <p>Unlock the full potential of your faculty experience</p>
        <button className="ria-button">Explore</button>
      </section>

      {/* Uncomment if you want to include the About section */}
      {/* 
          <section className="about-section">
            <img src="/APHotos/image.png" alt="University Image" />
            <div className="about-text">
              <h2>About Our University</h2>
              <p>
                Welcome to the most dynamic university on the planet! Here, we don’t
                just teach; we inspire, innovate, and ignite the flames of curiosity
                in every student and faculty member...
              </p>
            </div>
          </section>
          */}

      <Footer/>

    </div>
  );
}
