import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const doctorsData = [
  {
    id: "doc-1",
    name: "Dr. Ananya Sharma",
    avatar: "👩‍⚕️",
    specialty: "General Medicine",
    experience: "12 years exp.",
    rating: "4.9 ★",
    hospital: "City Central Healthcare",
    fee: "₹500",
    availability: "Mon - Sat (09:00 AM - 04:00 PM)"
  },
  {
    id: "doc-2",
    name: "Dr. Amitab Roy",
    avatar: "👨‍⚕️",
    specialty: "Cardiology",
    experience: "18 years exp.",
    rating: "4.9 ★",
    hospital: "Heart & Vascular Institute",
    fee: "₹800",
    availability: "Mon - Fri (10:00 AM - 02:00 PM)"
  },
  {
    id: "doc-3",
    name: "Dr. Rajesh Varma",
    avatar: "👨‍⚕️",
    specialty: "Neurology",
    experience: "15 years exp.",
    rating: "4.8 ★",
    hospital: "Neuro Care & Brain Clinic",
    fee: "₹750",
    availability: "Tue - Sat (11:00 AM - 05:00 PM)"
  },
  {
    id: "doc-4",
    name: "Dr. Vikram Sethi",
    avatar: "👨‍⚕️",
    specialty: "Gastroenterology",
    experience: "10 years exp.",
    rating: "4.7 ★",
    hospital: "Digestive Health Specialty",
    fee: "₹600",
    availability: "Mon - Sat (02:00 PM - 07:00 PM)"
  },
  {
    id: "doc-5",
    name: "Dr. Sneha Kapoor",
    avatar: "👩‍⚕️",
    specialty: "Dermatology",
    experience: "9 years exp.",
    rating: "4.8 ★",
    hospital: "Skin & Laser Center",
    fee: "₹550",
    availability: "Mon - Fri (10:00 AM - 03:00 PM)"
  },
  {
    id: "doc-6",
    name: "Dr. Priya Nair",
    avatar: "👩‍⚕️",
    specialty: "ENT Specialist",
    experience: "11 years exp.",
    rating: "4.9 ★",
    hospital: "ENT & Allergy Clinic",
    fee: "₹500",
    availability: "Mon - Sat (09:30 AM - 01:30 PM)"
  },
  {
    id: "doc-7",
    name: "Dr. Sanjay Gupta",
    avatar: "👨‍⚕️",
    specialty: "Orthopedics",
    experience: "14 years exp.",
    rating: "4.8 ★",
    hospital: "Bone & Joint Super Specialty",
    fee: "₹700",
    availability: "Mon - Sat (11:00 AM - 04:00 PM)"
  },
  {
    id: "doc-8",
    name: "Dr. Meera Joshi",
    avatar: "👩‍⚕️",
    specialty: "Ophthalmology",
    experience: "8 years exp.",
    rating: "4.7 ★",
    hospital: "Vision Care Eye Hospital",
    fee: "₹500",
    availability: "Tue - Sun (10:00 AM - 02:00 PM)"
  }
];

export default function DoctorsView({ onBookAppointment }) {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
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

  const handleOpenBookingModal = (doc) => {
    setSelectedDoctor(doc);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const newAppointment = {
      id: 'appt-' + Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorAvatar: selectedDoctor.avatar,
      specialty: selectedDoctor.specialty,
      hospital: selectedDoctor.hospital,
      date: bookingDate,
      time: bookingTime,
      reason: bookingReason || 'General Medical Consultation',
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    onBookAppointment(newAppointment);
    setSelectedDoctor(null);
    setBookingReason('');
    navigate('/appointments');
  };

  return (
    <div className="page-container">
      <div className="view-header">
        <div>
          <h2>👨‍⚕️ Find Specialist Doctors & Book Consultation</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Choose from top certified medical specialists for physical or tele-consultation.
          </p>
        </div>
      </div>

      {/* Doctor search aur department filter options */}
      <div className="filter-bar">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
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
              <div className="doc-avatar-large">{doc.avatar}</div>
              <div>
                <h3 className="doc-name">{doc.name}</h3>
                <div className="doc-spec-badge">{doc.specialty}</div>
                <div className="doc-exp">{doc.experience} • <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{doc.rating}</span></div>
              </div>
            </div>

            <div className="doc-details-list">
              <div className="detail-item">
                <span>🏥 Clinic:</span> <strong>{doc.hospital}</strong>
              </div>
              <div className="detail-item">
                <span>🕒 Timing:</span> <strong>{doc.availability}</strong>
              </div>
              <div className="detail-item">
                <span>💵 Consultation Fee:</span> <strong style={{ color: 'var(--primary-color)' }}>{doc.fee}</strong>
              </div>
            </div>

            <button className="btn-book-now" onClick={() => handleOpenBookingModal(doc)}>
              🗓️ Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Appointment schedule karne ka modal window */}
      {selectedDoctor && (
        <div className="modal-backdrop" onClick={() => setSelectedDoctor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🗓️ Schedule Doctor Appointment</h3>
              <button className="close-btn" onClick={() => setSelectedDoctor(null)}>✕</button>
            </div>

            <form onSubmit={handleConfirmBooking} className="modal-form">
              <div className="modal-doc-summary">
                <div className="doc-avatar-large">{selectedDoctor.avatar}</div>
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
                  rows="3"
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
