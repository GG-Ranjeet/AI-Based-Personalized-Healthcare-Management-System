import React from 'react';

export default function AboutView() {
  return (
    <div className="page-container">
      <div className="about-card">
        <h2>🏥 AI Healthcare Recommendation System</h2>
        <p>
          This project is an intelligent patient-facing web application designed to evaluate preliminary health symptoms, assign risk levels, and guide patients to appropriate medical specialist departments.
        </p>
      </div>

      <div className="about-card">
        <h2>🛠️ Technical Architecture</h2>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <li><strong>Frontend Framework:</strong> React.js 19 + Vite</li>
          <li><strong>Client-Side Routing:</strong> React Router DOM v7</li>
          <li><strong>Recommendation Logic:</strong> Rule-Based Local Medical Knowledge Base & Keyword Matching Engine</li>
          <li><strong>State & Theme:</strong> React Hooks (`useState`, `useEffect`) with `localStorage` Persistence</li>
          <li><strong>Data Privacy:</strong> 100% Client-Side Processing (0 Paid API Key Dependencies)</li>
        </ul>
      </div>

      <div className="about-card">
        <h2>✨ Key Features</h2>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <li>Patient Health Vitals Dashboard & Quick Services</li>
          <li>Doctor Directory & Instant Appointment Booking System</li>
          <li>Interactive AI Chatbot with realistic typing indicators</li>
          <li>Doctor Specialist Department Directory</li>
          <li>Instant First-Aid and Emergency Contact guide</li>
          <li>Light Mode & Dark Mode toggle for eye comfort</li>
        </ul>
      </div>
    </div>
  );
}
