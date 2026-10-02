import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header({ patientInfo }) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Patient Health Overview Dashboard';
      case '/chat':
        return 'AI Symptom Checker & Health Assistant';
      case '/doctors':
        return 'Specialist Doctor Directory';
      case '/appointments':
        return 'My Scheduled Appointments';
      case '/emergency':
        return 'Emergency Contacts & First Aid';
      case '/remedies':
        return 'Natural Home Remedies';
      case '/about':
        return 'About HealthAI Project';
      default:
        return 'Healthcare System';
    }
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>{getTitle()}</h1>
        <div className="status-indicator">
          <span className="status-dot"></span> Offline Engine Active
        </div>
      </div>

      <div className="header-user-badge">
        <div className="user-avatar-small">👤</div>
        <div className="user-meta">
          <span className="user-name-small">{patientInfo.name}</span>
          <span className="user-status-text">Patient • ID #{patientInfo.id}</span>
        </div>
      </div>
    </header>
  );
}
