import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Stethoscope, Building, Clock, IndianRupee, CalendarDays, X } from 'lucide-react';

export interface Doctor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  rating: string;
  hospital: string;
  fee: string;
  availability: string;
}

// We removed the hardcoded doctorsData, now fetching from API.

export default function DoctorsView({ onBookAppointment }: { onBookAppointment?: (appt: any) => void }) {
  const navigate = useNavigate();
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/doctors', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDoctorsData(data.doctors.map((d: any) => ({ ...d, id: d._id })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Appointment booking modal form states
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingReason, setBookingReason] = useState('');

  const departments = ['All', 'General Medicine', 'Cardiology', 'Neurology', 'Gastroenterology', 'Dermatology', 'ENT Specialist', 'Orthopedics', 'Ophthalmology'];

  const filteredDoctors = doctorsData.filter(doc => {
    const matchesDept = selectedDept === 'All' || doc.specialty === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenBookingModal = (doc: Doctor) => {
    setSelectedDoctor(doc);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const newAppointment = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorAvatar: selectedDoctor.avatar,
      specialty: selectedDoctor.specialty,
      hospital: selectedDoctor.hospital,
      date: bookingDate,
      time: bookingTime,
      reason: bookingReason || 'General Medical Consultation',
    };

    try {
      const token = localStorage.getItem('token');
      await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAppointment)
      });
      // Try calling onBookAppointment if it exists for backwards compatibility
      if (onBookAppointment) {
        onBookAppointment(newAppointment);
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
    }

    setSelectedDoctor(null);
    setBookingReason('');
    navigate('/dashboard/appointment');
  };

  return (
    <div className="page-container">
      <div className="view-header">
        <div>
          <h2 className="flex items-center gap-2"><Stethoscope size={24} className="text-blue-600" /> Find Specialist Doctors & Book Consultation</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Choose from top certified medical specialists for physical or tele-consultation.
          </p>
        </div>
      </div>

      {/* Doctor search aur department filter options */}
      <div className="filter-bar">
        <div className="search-box relative flex items-center">
          <span className="absolute left-3 text-gray-400"><Search size={18} /></span>
          <input
            type="text"
            className="pl-10 pr-4 py-2"
            placeholder="Search by doctor name, specialty, or clinic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="dept-filter-chips">
          {departments.map((dept, idx) => (
            <button
              key={idx}
              className={`filter-chip ${selectedDept === dept ? 'active' : ''}`}
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered doctors ke cards ka grid layout */}
      <div className="doctors-grid">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <div className="doc-card-header">
              <div className="doc-avatar-large bg-blue-50 text-blue-600 flex items-center justify-center rounded-full w-16 h-16">
                <User size={32} />
              </div>
              <div>
                <h3 className="doc-name">{doc.name}</h3>
                <div className="doc-spec-badge">{doc.specialty}</div>
                <div className="doc-exp">{doc.experience} • <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{doc.rating}</span></div>
              </div>
            </div>

            <div className="doc-details-list">
              <div className="detail-item flex items-center gap-2">
                <Building size={16} className="text-gray-500" /> <span>Clinic:</span> <strong>{doc.hospital}</strong>
              </div>
              <div className="detail-item flex items-center gap-2">
                <Clock size={16} className="text-gray-500" /> <span>Timing:</span> <strong>{doc.availability}</strong>
              </div>
              <div className="detail-item flex items-center gap-2">
                <IndianRupee size={16} className="text-gray-500" /> <span>Consultation Fee:</span> <strong style={{ color: 'var(--primary-color)' }}>{doc.fee}</strong>
              </div>
            </div>

            <button className="btn-book-now flex items-center justify-center gap-2" onClick={() => handleOpenBookingModal(doc)}>
              <CalendarDays size={18} /> Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Appointment schedule karne ka modal window */}
      {selectedDoctor && (
        <div className="modal-backdrop" onClick={() => setSelectedDoctor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="flex items-center gap-2"><CalendarDays size={20} className="text-blue-600" /> Schedule Doctor Appointment</h3>
              <button className="close-btn flex items-center justify-center" onClick={() => setSelectedDoctor(null)}><X size={20} /></button>
            </div>

            <form onSubmit={handleConfirmBooking} className="modal-form">
              <div className="modal-doc-summary">
                <div className="doc-avatar-large bg-blue-50 text-blue-600 flex items-center justify-center rounded-full w-16 h-16">
                  <User size={32} />
                </div>
                <div>
                  <strong>{selectedDoctor.name}</strong>
                  <p>{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
                  <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Fee: {selectedDoctor.fee}</p>
                </div>
              </div>

              <div className="form-group">
                <label>Select Appointment Date:</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Select Time Slot:</label>
                <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                  <option value="09:30 AM">09:30 AM (Morning)</option>
                  <option value="11:00 AM">11:00 AM (Morning)</option>
                  <option value="02:30 PM">02:30 PM (Afternoon)</option>
                  <option value="04:30 PM">04:30 PM (Evening)</option>
                  <option value="06:00 PM">06:00 PM (Evening)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reason for Visit / Main Symptoms:</label>
                <textarea
                  placeholder="Describe your health concern briefly (e.g. routine checkup, fever, stomach pain)..."
                  rows={3}
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setSelectedDoctor(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
