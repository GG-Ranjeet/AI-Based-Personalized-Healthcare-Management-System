import "./App.css";
import Example from "./component/Example";
import LoginForm from "./auth/LoginForm";
import Dashboard from "./dashboard/patient";

import { BrowserRouter, Routes, Route } from "react-router";
import SignupForm from "./auth/SignupForm";
import { Home } from "./component/Home";
import ProtectedRoute from "./component/utils/ProtectedRoute";
import DashboardView from "./dashboard/patient_dashboard";
import { useEffect, useState } from "react";
import ChatView from "./dashboard/chatView";

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

    // const handleBookAppointment = (newAppt : any) => {
    //     setAppointments((prev: any) => [newAppt, ...prev]);
    // };

    return (
        <>
            <div id="app" className="min-h-screen flex items-center justify-center gap-4 bg-gray-100">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />}>
                                <Route index element={<DashboardView appointments={appointments} patientInfo={patientInfo} />} />
                                <Route path="chat" element={ <ChatView messages={messages} setMessages={setMessages} />} />
                                <Route path="appointment" element={<Example />} />
                                <Route path="example" element={<Example />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
