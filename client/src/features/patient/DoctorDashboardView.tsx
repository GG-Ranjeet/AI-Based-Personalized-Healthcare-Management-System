import React, { useState } from 'react';

export default function DoctorDashboardView({ appointments, onUpdateAppointmentStatus, onAddPrescription }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState('doc-1');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const doctorProfiles = [
    { id: 'doc-1', name: 'Dr. Ananya Sharma', specialty: 'General Medicine', avatar: '👩‍⚕️', clinic: 'City Central Healthcare' },
    { id: 'doc-2', name: 'Dr. Amitab Roy', specialty: 'Cardiology', avatar: '👨‍⚕️', clinic: 'Heart & Vascular Institute' },
    { id: 'doc-3', name: 'Dr. Rajesh Varma', specialty: 'Neurology', avatar: '👨‍⚕️', clinic: 'Neuro Care Clinic' }
  ];

  const currentDoctor = doctorProfiles.find(d => d.id === selectedDoctorId) || doctorProfiles[0];

  // Selected doctor ke appointments filter karne ke liye
  const doctorAppointments = appointments.filter(appt => {
    const matchesDoc = appt.doctorId === selectedDoctorId || !appt.doctorId;
    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter;
    return matchesDoc && matchesStatus;
  });

  const totalAppts = appointments.length;
  const pendingAppts = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length;
  const completedAppts = appointments.filter(a => a.status === 'Completed').length;

  const handleOpenPrescriptionModal = (appt) => {
    setSelectedAppointment(appt);
    setPrescriptionText(appt.prescription || '');
  };

  const handleSavePrescription = (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    onAddPrescription(selectedAppointment.id, prescriptionText);
    onUpdateAppointmentStatus(selectedAppointment.id, 'Completed');
    setSelectedAppointment(null);
    setPrescriptionText('');
  };

  return (
    <div className="page-container dashboard-fade">
      {/* Doctor header welcome card */}
      <div className="patient-banner" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0f172a 100%)' }}>
        <div className="patient-main-info">
          <div className="patient-avatar" style={{ background: '#38bdf8', color: '#fff' }}>{currentDoctor.avatar}</div>
          <div>
            <h2 className="patient-name">Welcome, {currentDoctor.name}!</h2>
            <p className="patient-subtext">
              Specialty: <strong>{currentDoctor.specialty}</strong> • Hospital: <strong>{currentDoctor.clinic}</strong> • Role: <span className="blood-badge" style={{ background: '#38bdf8' }}>Senior Medical Officer</span>
            </p>
          </div>
        </div>

        {/* Doctor change karne ka dropdown */}
        <div className="banner-actions" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>Switch Doctor View:</label>
          <select 
            value={selectedDoctorId} 
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#f8fafc', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {doctorProfiles.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments aur stats summary cards */}
      <div className="vitals-grid" style={{ marginTop: '20px' }}>
        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">📋</span>
            <span className="status-badge status-good">Total Bookings</span>
          </div>
          <div className="vital-value">{totalAppts}</div>
          <div className="vital-label">Patient Appointments</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">⏳</span>
            <span className="status-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>Action Needed</span>
          </div>
          <div className="vital-value">{pendingAppts}</div>
          <div className="vital-label">Pending Patients</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">✅</span>
            <span className="status-badge status-good">Attended</span>
          </div>
          <div className="vital-value">{completedAppts}</div>
          <div className="vital-label">Completed Consultations</div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <span className="vital-icon">🤖</span>
            <span className="status-badge status-good">AI System</span>
          </div>
          <div className="vital-value">100%</div>
          <div className="vital-label">AI Symptom Triage Active</div>
        </div>
      </div>

      {/* Patient queue aur active appointments list */}
      <div className="card-panel" style={{ marginTop: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3>🩺 Patient Queue & Appointment Management</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Real-time patient requests originating from Patient AI Symptom Checker & Directory.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Confirmed', 'Completed'].map(st => (
              <button
                key={st}
                className={`filter-chip ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {doctorAppointments.length === 0 ? (
          <div className="empty-state-box">
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>👨‍⚕️</div>
            <p>No appointments match the selected filter.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {doctorAppointments.map((appt) => (
              <div 
                key={appt.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ fontSize: '28px', background: 'rgba(2, 132, 199, 0.1)', padding: '10px', borderRadius: '50%' }}>
                    👤
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', margin: '0 0 4px 0' }}>Patient: Sumit Singh (ID #P-80492)</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <span>🗓️ <strong>{appt.date}</strong> at <strong>{appt.time}</strong></span> • 
                      <span> Specialty: <strong>{appt.specialty}</strong></span>
                    </div>
                    <div style={{ fontSize: '13px', marginTop: '4px', color: 'var(--primary-color)' }}>
                      <strong>Reason / AI Symptoms:</strong> "{appt.reason}"
                    </div>

                    {appt.prescription && (
                      <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '13px' }}>
                        💊 <strong>Doctor Prescription:</strong> {appt.prescription}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`appt-status-tag ${appt.status === 'Completed' ? 'status-good' : ''}`}>
                    {appt.status}
                  </span>

                  {appt.status !== 'Completed' && (
                    <>
                      <button 
                        className="btn-small-primary" 
                        onClick={() => handleOpenPrescriptionModal(appt)}
                      >
                        📝 Attend & Prescribe
                      </button>
                      <button 
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px', color: '#ef4444' }}
                        onClick={() => onUpdateAppointmentStatus(appt.id, 'Cancelled')}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prescription write karne ka modal */}
      {selectedAppointment && (
        <div className="modal-backdrop" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 Add Prescription & Complete Consultation</h3>
              <button className="close-btn" onClick={() => setSelectedAppointment(null)}>✕</button>
            </div>

            <form onSubmit={handleSavePrescription} className="modal-form">
              <div style={{ background: 'rgba(2, 132, 199, 0.08)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Patient: Sumit Singh (#P-80492)</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Reason: "{selectedAppointment.reason}"
                </p>
              </div>

              <div className="form-group">
                <label>Doctor Advice / Prescription Medicines / Tests:</label>
                <textarea
                  required
                  rows="4"
                  placeholder="e.g. Paracetamol 500mg (1-0-1 after food for 3 days), Rest & Hydration..."
                  value={prescriptionText}
                  onChange={(e) => setPrescriptionText(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setSelectedAppointment(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Prescription & Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
