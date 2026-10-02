import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './patient.css';
import './patient_app.css';

export default function PatientLayout({ patientInfo }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('health_app_theme') || 'light';
  });
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            const response = await fetch("/api/dashboard/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('health_app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleClearChat = () => {
    localStorage.removeItem('health_app_chat');
    window.location.reload(); // simple way to clear chat and remount
  };

  if (loading) {
    return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  // Use the fetched user data if available, otherwise fallback to patientInfo
  const displayInfo = user ? { ...patientInfo, name: user.name, email: user.email } : patientInfo;

  return (
    <div className="app-container">
      <Sidebar theme={theme} toggleTheme={toggleTheme} onClearChat={handleClearChat} />
      <main className="main-content">
        <Header patientInfo={displayInfo} />
        <Outlet context={{ displayInfo }} />
      </main>
    </div>
  );
}

