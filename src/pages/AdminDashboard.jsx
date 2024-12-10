import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import fakeData from '../data/fakeAdminData.json';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [activeSection, setActiveSection] = useState('personalInfo');

  useEffect(() => {
    // Simulate fetching data
    setAdminData(fakeData);
  }, []);

  if (!adminData) return <div>Loading...</div>;

  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return (
          <div className="dashboard-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {adminData.personalInfo.name}</p>
            <p><strong>Email:</strong> {adminData.personalInfo.email}</p>
            <p><strong>Contact:</strong> {adminData.personalInfo.contact}</p>
            <p><strong>Role:</strong> {adminData.personalInfo.role}</p>
          </div>
        );
      case 'systemStats':
        return (
          <div className="dashboard-section">
            <h3>System Statistics</h3>
            <p><strong>Total Students:</strong> {adminData.systemStats.totalStudents}</p>
            <p><strong>Total Courses:</strong> {adminData.systemStats.totalCourses}</p>
            <p><strong>Total Faculty:</strong> {adminData.systemStats.totalFaculty}</p>
          </div>
        );
      case 'recentActivities':
        return (
          <div className="dashboard-section">
            <h3>Recent Activities</h3>
            <ul>
              {adminData.recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
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
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-sidebar">
        <button onClick={() => setActiveSection('personalInfo')}>Personal Info</button>
        <button onClick={() => setActiveSection('systemStats')}>System Stats</button>
        <button onClick={() => setActiveSection('recentActivities')}>Recent Activities</button>
      </div>
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
