import React from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getUserType } from "./LoginPage";
import "../App.css";

const CoursePage = () => {
  const course = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const userType = getUserType();

  const deleteCourse = async () => {
    const confirm = window.confirm("Sure want to delete?");
    if (!confirm) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    navigate("/courses");
  };

  return (
    <div className="course-page">
      <div className="course-container">
        <section>
          <a className="back-link" href="/courses">
            Back to Courses
          </a>
        </section>

        <div className="course-card">
          <img
            src="./banner-kba.png"
            alt="Course Thumbnail"
            className="course-thumbnail"
          />
          <div className="course-content">
            <div className="course-header">
              <h1 className="course-title">{course.title}</h1>
              <div className="course-actions">
                <span className="course-price">{course.price}</span>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
            <div className="course-section">
              <h2 className="course-section-title">Description</h2>
              <p>{course.description}</p>
            </div>
            <div className="course-section">
              <h2 className="course-section-title">Prerequisites</h2>
              <ul className="course-list">
                <li>Basic understanding of blockchain technology</li>
                <li>Familiarity with programming languages</li>
                <li>Internet access</li>
              </ul>
            </div>
            <div className="course-section">
              <h2 className="course-section-title">Features</h2>
              <ul className="course-list">
                <li>40 hours of content</li>
                <li>Certificate of completion</li>
                <li>Access to community forums</li>
                <li>Downloadable resources</li>
                <li>24/7 support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="course-footer">
          {userType === "admin" && (
            <>
              <Link to={`/edit-course/${id}`} className="edit-course-btn">
                Edit Course
              </Link>
              <button onClick={deleteCourse} className="remove-course-btn">
                Remove Course
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const courseLoader = async ({ params }) => {
  const res = await fetch(`/api/courses/${params.id}`);
  const data = await res.json();
  return data;
};

export { CoursePage as default, courseLoader };
