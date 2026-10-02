import React from 'react';

const departmentsData = [
  {
    icon: "🩺",
    title: "General Medicine",
    description: "Evaluates general acute symptoms, viral fever, flu, fatigue, and initial body health checks."
  },
  {
    icon: "🫀",
    title: "Cardiology",
    description: "Specializes in heart health, chest tightness, blood pressure regulation, and cardiovascular care."
  },
  {
    icon: "🤢",
    title: "Gastroenterology",
    description: "Treats stomach acid, gastritis, indigestion, liver conditions, and abdominal discomfort."
  },
  {
    icon: "🧴",
    title: "Dermatology",
    description: "Handles skin rashes, eczema, allergies, acne, and cutaneous infections."
  },
  {
    icon: "🧠",
    title: "Neurology",
    description: "Diagnoses migraines, severe nerve pain, chronic headaches, and neurological disorders."
  },
  {
    icon: "👶",
    title: "Pediatrics",
    description: "Dedicated medical care for infants, children, and adolescent growth & immunization."
  },
  {
    icon: "👂",
    title: "ENT Specialist",
    description: "Treats ear infections, nasal congestion, sinusitis, and throat infections."
  },
  {
    icon: "🦿",
    title: "Orthopedics",
    description: "Bone health, joint pains, sports injuries, fractures, and spine care."
  }
];

export default function DepartmentsView() {
  return (
    <div className="page-container">
      <h2>Hospital Departments & Specialists</h2>
      <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
        Select a specialist department based on your diagnosed primary symptoms:
      </p>

      <div className="dept-grid">
        {departmentsData.map((dept, idx) => (
          <div key={idx} className="dept-card">
            <div className="dept-icon">{dept.icon}</div>
            <h3>{dept.title}</h3>
            <p>{dept.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
