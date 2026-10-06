import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar({ theme, toggleTheme, onClearChat }) {
  const navigate = useNavigate();

  const handleNewChat = () => {
    onClearChat();
    navigate('/chat');
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>🩺</span>
          <div>
            <h2>HealthAI</h2>
            <span className="brand-subtitle">Smart Patient Care</span>
          </div>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <span>💬</span> Start AI Assistant
        </button>

        <div className="menu-label">Patient Portal Navigation</div>
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <span>📊</span> Patient Dashboard
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>💬</span> AI Health Assistant
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>👨‍⚕️</span> Find Doctors
          </NavLink>
          <NavLink to="/appointments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>📅</span> My Appointments
          </NavLink>
          <NavLink to="/emergency" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>🚑</span> Emergency & First Aid
          </NavLink>
          <NavLink to="/remedies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>🌿</span> Home Remedies
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>ℹ️</span> About System
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="action-btn" onClick={toggleTheme}>
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
        <button className="action-btn" onClick={onClearChat}>
          <span>🗑️</span> Reset AI Chat
        </button>
      </div>
    </aside>
  );
}
