import React from "react";
import "../App.css";// Ensure this line is present to import your app.css

const Hero = () => {
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">
          Learn Blockchain Technology From Kerala's First Dedicated Facility for
          Blockchain Education
        </h1>
        <h2 className="hero-subtitle">Since 2017</h2>
      </div>

      <div className="top-courses-section">
        <h1 className="top-courses-title">BROWSE OUR TOP COURSES</h1>
        <h2 className="top-courses-subtitle">
          Choose the course that's right for your career goals.
        </h2>
      </div>
    </>
  );
};

export default Hero;
