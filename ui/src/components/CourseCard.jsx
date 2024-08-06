import React, { useState } from "react";
import courseImage from "../assets/images/rp.png";
import { Link } from "react-router-dom";
import "../App.css"; // Ensure this line is present to import your app.css

const CourseCard = ({ course }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = course.description;

  if (!showFullDescription) {
    description = description.substring(0, 100) + "  ...";
  }

  const toggleText = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <img src={courseImage} alt="course thumbnail" className="course-image" />
      <p className="course-description">{description}</p>
      <button onClick={toggleText} className="toggle-button">
        {showFullDescription ? "Less" : "More"}
      </button>
      <Link to={`/courses/${course.courseId}`} className="learn-more-button">
        Learn More
      </Link>
    </div>
  );
};

export default CourseCard;
