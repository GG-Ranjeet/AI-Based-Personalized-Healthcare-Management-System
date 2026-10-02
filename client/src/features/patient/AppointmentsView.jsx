import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppointmentsView({ appointments, onCancelAppointment }) {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="view-header-row">
        <div>
          <h2>📅 My Doctor Appointments</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            View and manage your upcoming doctor consultations and hospital visits.
          </p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/doctors')}>
          + Book New Consultation
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">🗓️</div>
          <h3>No Appointments Scheduled</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>
            You currently have no active appointments booked. Browse our doctor directory to schedule a visit.
          </p>
          <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/doctors')}>
            Find & Book Doctor
          </button>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <div className="appt-card-left">
                <div className="appt-doc-avatar-large">{appt.doctorAvatar || '👨‍⚕️'}</div>
                <div className="appt-details">
                  <h3 className="appt-doc-title">{appt.doctorName}</h3>
                  <div className="appt-specialty">{appt.specialty} • 🏢 {appt.hospital}</div>
                  <div className="appt-reason">
                    <strong>Reason:</strong> {appt.reason}
                  </div>
                  <div className="appt-booked-on">Booked on: {appt.createdAt}</div>
                </div>
              </div>

              <div className="appt-card-right">
                <div className="appt-time-box">
                  <div className="time-date">🗓️ {appt.date}</div>
                  <div className="time-slot">⏰ {appt.time}</div>
                </div>
                <span className="status-badge status-confirmed">{appt.status}</span>
                <button
                  className="btn-cancel-appt"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to cancel appointment with ${appt.doctorName}?`)) {
                      onCancelAppointment(appt.id);
                    }
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
