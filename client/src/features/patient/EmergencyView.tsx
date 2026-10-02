import React from 'react';

export default function EmergencyView() {
  return (
    <div className="page-container">
      <div className="emergency-card">
        <h2>🚨 Emergency Contact Numbers</h2>
        <p style={{ marginTop: '8px', fontSize: '15px' }}>
          <strong>Ambulance / National Emergency:</strong> 102 / 112
        </p>
        <p style={{ marginTop: '4px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Always call national emergency numbers immediately if you experience sudden severe chest pressure, severe bleeding, or loss of consciousness.
        </p>
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '12px' }}>Instant First Aid Guidelines</h3>

      <div className="dept-grid">
        <div className="dept-card">
          <div className="dept-icon">🌡️</div>
          <h3>High Fever First Aid</h3>
          <p>Apply cold water compress on forehead. Stay hydrated with ORS/water. Monitor temperature every 2 hours.</p>
        </div>

        <div className="dept-card">
          <div className="dept-icon">🩹</div>
          <h3>Minor Burns</h3>
          <p>Hold burned skin under cool running tap water for 10-15 minutes. Cover loosely with sterile bandage. Do not apply ice directly.</p>
        </div>

        <div className="dept-card">
          <div className="dept-icon">🫀</div>
          <h3>Chest Discomfort</h3>
          <p>Stop all physical exertion immediately. Sit in a comfortable upright position. Ensure fresh air circulation and request emergency aid.</p>
        </div>

        <div className="dept-card">
          <div className="dept-icon">🤢</div>
          <h3>Severe Acidity / Nausea</h3>
          <p>Sip warm water or ginger tea. Sit upright and avoid lying down immediately after consuming fluids.</p>
        </div>
      </div>
    </div>
  );
}
