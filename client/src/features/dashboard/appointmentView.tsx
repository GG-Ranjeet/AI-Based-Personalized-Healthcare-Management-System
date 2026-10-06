import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, CalendarCheck, CalendarX, Stethoscope, Clock, Building, Plus } from 'lucide-react';

export default function AppointmentsView() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onCancelAppointment = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/appointments/${id}/cancel`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <div className="view-header-row">
        <div>
          <h2 className="flex items-center gap-2"><CalendarDays size={24} className="text-blue-600" /> My Doctor Appointments</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            View and manage your upcoming doctor consultations and hospital visits.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => navigate('/doctors')}>
          <Plus size={18} /> Book New Consultation
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon bg-blue-50 text-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarCheck size={32} />
          </div>
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
          {appointments.map((appt : any) => (
            <div key={appt._id || appt.id} className="appointment-card">
              <div className="appt-card-left">
                <div className="appt-doc-avatar-large bg-blue-50 text-blue-600 rounded-full flex items-center justify-center w-16 h-16">
                  <Stethoscope size={32} />
                </div>
                <div className="appt-details">
                  <h3 className="appt-doc-title">{appt.doctorName}</h3>
                  <div className="appt-specialty flex items-center gap-2">
                    {appt.specialty} • <Building size={14} className="text-gray-400" /> {appt.hospital}
                  </div>
                  <div className="appt-reason">
                    <strong>Reason:</strong> {appt.reason}
                  </div>
                  <div className="appt-booked-on">Booked on: {new Date(appt.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="appt-card-right">
                <div className="appt-time-box">
                  <div className="time-date flex items-center gap-1.5"><CalendarDays size={16} className="text-blue-500" /> {appt.date}</div>
                  <div className="time-slot flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> {appt.time}</div>
                </div>
                <span className="status-badge status-confirmed">{appt.status}</span>
                <button
                  className="btn-cancel-appt flex items-center gap-2 justify-center"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to cancel appointment with ${appt.doctorName}?`)) {
                      onCancelAppointment(appt._id || appt.id);
                    }
                  }}
                >
                  <CalendarX size={16} /> Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
