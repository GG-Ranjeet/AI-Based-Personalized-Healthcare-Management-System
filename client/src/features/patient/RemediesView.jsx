import React from 'react';

const remediesData = [
  {
    icon: "🫚",
    title: "Ginger & Honey Tea",
    category: "Digestive & Cold Relief",
    benefits: "Eases nausea, reduces stomach acidity, and soothes sore throat.",
    usage: "Boil crushed ginger in 1 cup of water for 5 minutes, strain, add 1 tsp honey, and sip warm."
  },
  {
    icon: "🌱",
    title: "Turmeric Milk (Golden Milk)",
    category: "Immunity & Joint Care",
    benefits: "Natural anti-inflammatory that promotes muscle recovery and boosts immunity.",
    usage: "Add 1/2 tsp turmeric powder to warm milk with a pinch of black pepper. Drink before bedtime."
  },
  {
    icon: "🍋",
    title: "Warm Lemon & Honey Water",
    category: "Detox & Metabolism",
    benefits: "Hydrates the body, aids digestion, and provides natural Vitamin C.",
    usage: "Squeeze half a lemon into lukewarm water, add 1 tsp honey, and drink on an empty stomach."
  },
  {
    icon: "🌿",
    title: "Tulsi (Holy Basil) Steam Inhalation",
    category: "Respiratory & Sinus Relief",
    benefits: "Clears congested nasal passages, reduces throat irritation, and relieves headache.",
    usage: "Boil fresh Tulsi leaves in water, cover head with a towel, and gently inhale steam for 5-7 minutes."
  },
  {
    icon: "🪻",
    title: "Aloe Vera Skin Soother",
    category: "Skin Care & Minor Burns",
    benefits: "Cools sun-exposed skin, reduces itching, and hydrates dry skin patches.",
    usage: "Extract fresh gel from an aloe vera leaf and apply gently to clean skin."
  },
  {
    icon: "🫖",
    title: "Peppermint & Chamomile Infusion",
    category: "Sleep & Stress Relaxation",
    benefits: "Relaxes nervous tension, eases headache strain, and encourages restful sleep.",
    usage: "Steep chamomile or peppermint tea bag in hot water for 5 minutes. Drink 30 mins before sleeping."
  }
];

export default function RemediesView() {
  return (
    <div className="page-container">
      <div className="view-header">
        <h2>🌿 Natural Home Remedies & Wellness Care</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Safe, natural home-care practices for mild daily health discomforts.
        </p>
      </div>

      <div className="dept-grid" style={{ marginTop: '20px' }}>
        {remediesData.map((item, idx) => (
          <div key={idx} className="dept-card remedy-card">
            <div className="dept-icon">{item.icon}</div>
            <span className="remedy-category">{item.category}</span>
            <h3 style={{ marginTop: '8px' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-color)', marginTop: '6px' }}><strong>Benefits:</strong> {item.benefits}</p>
            <div className="remedy-usage">
              <strong>How to Use:</strong> {item.usage}
            </div>
          </div>
        ))}
      </div>

      <div className="disclaimer-banner" style={{ marginTop: '24px' }}>
        ⚠️ <strong>Note:</strong> Home remedies are intended for mild symptoms only. If your symptoms worsen or persist, please consult a qualified healthcare professional immediately.
      </div>
    </div>
  );
}
