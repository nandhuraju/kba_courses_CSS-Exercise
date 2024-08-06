import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../App.css";

const EditCoursePage = () => {
  const course = useLoaderData();

  const [title, setTitle] = useState(course.title);
  const [courseId, setCourseId] = useState(course.courseId);
  const [type, setType] = useState(course.type);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedCourse = {
      title,
      courseId,
      type,
      description,
      price,
    };
    await updateCourseSubmit(updatedCourse);
    navigate(`/courses/${courseId}`);
  };

  const updateCourseSubmit = async (updatedCourse) => {
    const res = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCourse),
    });
    return res;
  };

  return (
    <section className="edit-course-page">
      <div className="edit-course-container">
        <div className="edit-course-card">
          <form onSubmit={submitForm}>
            <h2 className="edit-course-title">Update Course</h2>

            <div className="form-group">
              <label className="form-label">Course Name</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="eg. Certified Blockchain Associate"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label className="form-label">Course Id</label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                className="form-input"
                placeholder="eg. 1"
                required
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </div> */}

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Course Type
              </label>
              <select
                id="type"
                name="type"
                className="form-select"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Self-Paced">Self-Paced</option>
                <option value="Instructor-Led">Instructor-Led</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                rows="4"
                placeholder="Small description on the course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <select
                id="price"
                name="price"
                className="form-select"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="Rs.5000">Rs.5000</option>
                <option value="Rs.3500">Rs.3500</option>
                <option value="Rs.15000">Rs.15000</option>
              </select>
            </div>

            <div>
              <button className="submit-btn" type="submit">
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCoursePage;
