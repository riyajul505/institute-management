import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import fakeData from '../data/fakeStudentData.json';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeSection, setActiveSection] = useState('personalInfo');

  useEffect(() => {
    // Simulate fetching data
    setStudentData(fakeData);
    setEnrolledCourses(fakeData.enrolledCourses);
  }, []);

  const enrollCourse = (course) => {
    if (!enrolledCourses.find((c) => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  const dropCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter((course) => course.id !== courseId));
  };

  if (!studentData) return <div>Loading...</div>;

  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return (
          <div className="dashboard-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {studentData.personalInfo.name}</p>
            <p><strong>Email:</strong> {studentData.personalInfo.email}</p>
            <p><strong>Contact:</strong> {studentData.personalInfo.contact}</p>
            <p><strong>Address:</strong> {studentData.personalInfo.address}</p>
          </div>
        );
      case 'availableCourses':
        return (
          <div className="dashboard-section">
            <h3>Available Courses</h3>
            <ul>
              {studentData.availableCourses.map((course) => (
                <li key={course.id} className="dashboard-item">
                  <strong>{course.name}</strong>
                  <p>{course.schedule}</p>
                  <button onClick={() => enrollCourse(course)}>Enroll</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'enrolledCourses':
        return (
          <div className="dashboard-section">
            <h3>Enrolled Courses</h3>
            <ul>
              {enrolledCourses.map((course) => (
                <li key={course.id} className="dashboard-item">
                  <strong>{course.name}</strong>
                  <p>{course.schedule}</p>
                  <button onClick={() => dropCourse(course.id)}>Drop</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'grades':
        return (
          <div className="dashboard-section">
            <h3>Grades & Attendance</h3>
            <ul>
              {studentData.grades.map((grade, index) => (
                <li key={index} className="dashboard-item">
                  <strong>{grade.course}</strong>
                  <p>Grade: {grade.grade}</p>
                  <p>Attendance: {grade.attendance}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Student Dashboard</h2>
      <div className="dashboard-sidebar">
        <button onClick={() => setActiveSection('personalInfo')}>Personal Info</button>
        <button onClick={() => setActiveSection('availableCourses')}>Available Courses</button>
        <button onClick={() => setActiveSection('enrolledCourses')}>Enrolled Courses</button>
        <button onClick={() => setActiveSection('grades')}>Grades & Attendance</button>
      </div>
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default StudentDashboard;
