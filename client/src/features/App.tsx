import "./App.css";
import Example from "./component/Example";
import LoginForm from "./auth/LoginForm";
import Dashboard from "./dashboard/patient";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./auth/SignupForm";
import { Home } from "./component/Home";
import ProtectedRoute from "./component/utils/ProtectedRoute";
import DashboardViewOld from "./dashboard/patient_dashboard";
import { useEffect, useState } from "react";
import ChatViewOld from "./dashboard/chatView";

// Teammate Patient Components
import PatientLayout from "./patient/PatientLayout";
import DashboardView from "./patient/DashboardView";
import ChatView from "./patient/ChatView";
import DoctorsView from "./patient/DoctorsView";
import AppointmentsView from "./patient/AppointmentsView";
import DepartmentsView from "./patient/DepartmentsView";
import EmergencyView from "./patient/EmergencyView";
import AboutView from "./patient/AboutView";
import RemediesView from "./patient/RemediesView";

// Teammate Admin Components
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./admin/UserManagement";
import Analytics from "./admin/Analytics";
import SystemHealth from "./admin/SystemHealth";

const initialAppointments = [
    {
        id: "appt-101",
        doctorId: "doc-1",
        doctorName: "Dr. Ananya Sharma",
        doctorAvatar: "👩‍⚕️",
        specialty: "General Medicine",
        hospital: "City Central Healthcare",
        date: "2026-08-12",
        time: "10:30 AM",
        reason: "Routine Wellness & Immunity Checkup",
        status: "Confirmed",
        createdAt: "09 Aug 2026",
    },
];

const initialPatientInfo = {
    id: "P-80492",
    name: "Sumit Singh",
    age: 24,
    gender: "Male",
    bloodGroup: "B+",
};

function App() {
    const [patientInfo] = useState(initialPatientInfo);
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem("health_app_appointments");
        return saved ? JSON.parse(saved) : initialAppointments;
    });

    const defaultWelcomeMessage = {
        sender: 'bot',
        html: `
          <p>Hello! I am your <strong>AI Healthcare Recommendation Assistant</strong>.</p>
          <p>Describe how you are feeling or what symptoms you have (e.g., <em>"I have a high fever and headache"</em>). I will analyze your symptoms, estimate risk level, and recommend the right doctor department & first-aid steps.</p>
        `
    };

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('health_app_chat');
        return saved ? JSON.parse(saved) : [defaultWelcomeMessage];
    });

    useEffect(() => {
        localStorage.setItem("health_app_appointments", JSON.stringify(appointments));
    }, [appointments]);

    useEffect(() => {
        localStorage.setItem('health_app_chat', JSON.stringify(messages));
    }, [messages]);

    const handleBookAppointment = (newAppt: any) => {
        setAppointments((prev: any) => [newAppt, ...prev]);
    };

    const handleCancelAppointment = (apptId: any) => {
        setAppointments((prev: any) => prev.filter((a: any) => a.id !== apptId));
    };

    return (
        <div id="app" className="min-h-screen flex flex-col bg-gray-100">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />

                    <Route element={<ProtectedRoute />}>
                        {/* Old Dashboard Routes */}
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<DashboardViewOld appointments={appointments} patientInfo={patientInfo} />} />
                            <Route path="chat" element={<ChatViewOld messages={messages} setMessages={setMessages} />} />
                            <Route path="appointment" element={<Example />} />
                            <Route path="example" element={<Example />} />
                        </Route>

                        {/* New Patient Routes */}
                        <Route path="/patient" element={<PatientLayout patientInfo={patientInfo} />}>
                            <Route index element={<DashboardView appointments={appointments} patientInfo={patientInfo} />} />
                            <Route path="chat" element={<ChatView messages={messages} setMessages={setMessages} />} />
                            <Route path="doctors" element={<DoctorsView onBookAppointment={handleBookAppointment} />} />
                            <Route path="appointments" element={<AppointmentsView appointments={appointments} onCancelAppointment={handleCancelAppointment} />} />
                            <Route path="departments" element={<DepartmentsView />} />
                            <Route path="emergency" element={<EmergencyView />} />
                            <Route path="about" element={<AboutView />} />
                            <Route path="remedies" element={<RemediesView />} />
                        </Route>

                        {/* New Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminLogin />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="view-users" element={<UserManagement />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="system-health" element={<SystemHealth />} />
                            <Route path="user-management" element={<UserManagement />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
