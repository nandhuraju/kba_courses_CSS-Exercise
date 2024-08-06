import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { BarLoader } from "react-spinners";
import "../App.css"; 


const CourseCards = ({ isHome = false }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const courseList = isHome ? courses.slice(0, 3) : courses;

  return (
    <div className="course-cards-container">
      <h1>{isHome ? "Top courses" : "All courses"}</h1>
      {loading ? (
        <BarLoader />
      ) : (
        <div className="course-cards-grid">
          {courseList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCards;
