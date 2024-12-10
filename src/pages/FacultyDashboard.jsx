import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import fakeData from '../data/fakeFacultyData.json';

const FacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null);
  const [activeSection, setActiveSection] = useState('personalInfo');

  useEffect(() => {
    // Simulate fetching data
    setFacultyData(fakeData);
  }, []);

  const handleAddMaterial = (courseId, newMaterial) => {
    setFacultyData((prevData) => {
      const updatedCourses = prevData.coursesTeaching.map((course) => {
        if (course.id === courseId) {
          return { ...course, materials: [...course.materials, newMaterial] };
        }
        return course;
      });
      return { ...prevData, coursesTeaching: updatedCourses };
    });
  };

  const handleMarkAttendance = (courseId, studentId) => {
    console.log(`Marked attendance for student ${studentId} in course ${courseId}`);
    // Implement attendance marking logic
  };

  const handleEnterGrades = (courseId, studentId, grade) => {
    console.log(`Entered grade ${grade} for student ${studentId} in course ${courseId}`);
    // Implement grade entering logic
  };

  if (!facultyData) return <div>Loading...</div>;

  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return (
          <div className="dashboard-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {facultyData.personalInfo.name}</p>
            <p><strong>Email:</strong> {facultyData.personalInfo.email}</p>
            <p><strong>Contact:</strong> {facultyData.personalInfo.contact}</p>
            <p><strong>Department:</strong> {facultyData.personalInfo.department}</p>
          </div>
        );
      case 'coursesTeaching':
        return (
          <div className="dashboard-section">
            <h3>Courses Teaching</h3>
            <ul>
              {facultyData.coursesTeaching.map((course) => (
                <li key={course.id} className="dashboard-item">
                  <strong>{course.name}</strong>
                  <p>{course.description}</p>
                  <p>{course.schedule}</p>
                  <h4>Students Enrolled:</h4>
                  <ul>
                    {course.studentsEnrolled.map((student) => (
                      <li key={student.id}>
                        {student.name}
                        <button onClick={() => handleMarkAttendance(course.id, student.id)}>Mark Attendance</button>
                        <button onClick={() => handleEnterGrades(course.id, student.id, 'A')}>Enter Grade</button>
                      </li>
                    ))}
                  </ul>
                  <h4>Course Materials:</h4>
                  <ul>
                    {course.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddMaterial(course.id, 'New Material')}>Add Material</button>
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
      <h2 className="dashboard-title">Faculty Dashboard</h2>
      <div className="dashboard-sidebar">
        <button onClick={() => setActiveSection('personalInfo')}>Personal Info</button>
        <button onClick={() => setActiveSection('coursesTeaching')}>Courses Teaching</button>
      </div>
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default FacultyDashboard;
