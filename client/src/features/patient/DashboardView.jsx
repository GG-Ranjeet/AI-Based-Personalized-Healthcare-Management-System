import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DashboardView({ appointments, patientInfo }) {
  const navigate = useNavigate();

  return (
    <div className="page-container dashboard-fade">
      {/* Patient welcome card aur basic info */}
      <div className="patient-banner">
        <div className="patient-main-info">
          <div className="patient-avatar">👤</div>
          <div>
            <h2 className="patient-name">Welcome back, {patientInfo.name}!</h2>
            <p className="patient-subtext">
              Patient ID: <strong>#{patientInfo.id}</strong> • Gender: <strong>{patientInfo.gender}</strong> • Age: <strong>{patientInfo.age} yrs</strong> • Blood Group: <span className="blood-badge">{patientInfo.bloodGroup}</span>
            </p>
          </div>
        </div>
        <div className="banner-actions">
          <button className="btn-primary" onClick={() => navigate('/chat')}>
            💬 Start AI Symptom Check
          </button>
          <button className="btn-secondary" onClick={() => navigate('/doctors')}>
            👨‍⚕️ Book Doctor
          </button>
        </div>
      </div>

      {/* Health vitals (Blood pressure, Heart rate, etc.) */}
      <div className="section-title-row">
        <h3>📊 Real-Time Patient Health Vitals</h3>
        <span className="live-pulse">🔴 Live Monitoring (Local)</span>
      </div>

      <div className="vitals-grid">
        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">🫀</span>
            <span className="status-badge status-good">Optimal</span>
          </div>
          <div className="vital-value">120/80 <span className="unit">mmHg</span></div>
          <div className="vital-label">Blood Pressure</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">💓</span>
            <span className="status-badge status-good">Normal</span>
          </div>
          <div className="vital-value">72 <span className="unit">bpm</span></div>
          <div className="vital-label">Heart Rate</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">🌡️</span>
            <span className="status-badge status-good">Normal</span>
          </div>
          <div className="vital-value">98.6 <span className="unit">°F</span></div>
          <div className="vital-label">Body Temperature</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">🫁</span>
            <span className="status-badge status-good">Optimal</span>
          </div>
          <div className="vital-value">98 <span className="unit">%</span></div>
          <div className="vital-label">Oxygen (SpO2)</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">🩸</span>
            <span className="status-badge status-good">Fasting</span>
          </div>
          <div className="vital-value">95 <span className="unit">mg/dL</span></div>
          <div className="vital-label">Blood Sugar</div>
        </div>
      </div>

      {/* Quick services aur appointments layout grid */}
      <div className="dashboard-columns" style={{ marginTop: '24px' }}>
        {/* Quick action feature cards */}
        <div className="dashboard-col-main">
          <h3 style={{ marginBottom: '14px' }}>🚀 Quick Healthcare Services</h3>
          <div className="quick-services-grid">
            <div className="service-card" onClick={() => navigate('/chat')}>
              <div className="service-icon">🤖</div>
              <h4>AI Symptom Check</h4>
              <p>Describe your discomfort to get instant specialist recommendations & first aid.</p>
              <span className="service-link">Launch Assistant →</span>
            </div>

            <div className="service-card" onClick={() => navigate('/doctors')}>
              <div className="service-icon">🩺</div>
              <h4>Find Doctors</h4>
              <p>Browse experienced specialists by department and reserve time slots.</p>
              <span className="service-link">View Directory →</span>
            </div>

            <div className="service-card" onClick={() => navigate('/emergency')}>
              <div className="service-icon">🚑</div>
              <h4>Emergency Contacts</h4>
              <p>Instant hotline numbers (102/112) and first-aid steps for critical care.</p>
              <span className="service-link">Get Emergency Aid →</span>
            </div>

            <div className="service-card" onClick={() => navigate('/remedies')}>
              <div className="service-icon">🌿</div>
              <h4>Home Remedies</h4>
              <p>Curated natural home wellness tips for mild daily health concerns.</p>
              <span className="service-link">Explore Remedies →</span>
            </div>
          </div>
        </div>

        {/* Scheduled appointments side column */}
        <div className="dashboard-col-side">
          <div className="card-panel">
            <div className="panel-header">
              <h3>📅 Scheduled Appointments</h3>
              <Link to="/appointments" className="view-all-link">View All ({appointments.length})</Link>
            </div>

            {appointments.length === 0 ? (
              <div className="empty-state-box">
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📆</div>
                <p>No upcoming appointments scheduled.</p>
                <button className="btn-small-primary" style={{ marginTop: '10px' }} onClick={() => navigate('/doctors')}>
                  Book Consultation
                </button>
              </div>
            ) : (
              <div className="appointment-mini-list">
                {appointments.slice(0, 3).map((appt) => (
                  <div key={appt.id} className="appointment-mini-card">
                    <div className="appt-doc-avatar">{appt.doctorAvatar || '👨‍⚕️'}</div>
                    <div className="appt-info">
                      <strong className="appt-doc-name">{appt.doctorName}</strong>
                      <div className="appt-spec">{appt.specialty}</div>
                      <div className="appt-datetime">
                        <span>🗓️ {appt.date}</span> • <span>⏰ {appt.time}</span>
                      </div>
                    </div>
                    <span className="appt-status-tag">{appt.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Emergency helpline numbers box */}
          <div className="card-panel emergency-widget" style={{ marginTop: '16px' }}>
            <h4>🚨 Emergency Helplines</h4>
            <div className="helpline-row">
              <span>National Ambulance:</span>
              <a href="tel:102" className="helpline-num">102</a>
            </div>
            <div className="helpline-row">
              <span>National Emergency:</span>
              <a href="tel:112" className="helpline-num">112</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
