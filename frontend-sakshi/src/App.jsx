 import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import Analytics from "./pages/Analytics";
import SystemHealth from "./pages/SystemHealth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/add-doctor" element={<div>Add Doctor</div>} />
                <Route path="/view-users" element={<UserManagement />} />
                <Route path="/audit-logs" element={<div>Audit Logs</div>} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/health-outcomes" element={<div>HealthOutcomes</div>} />
                <Route path="/system-health" element={<SystemHealth />}/>
                <Route path="/settings" element={<div>Settings</div>} />
                <Route path="/user-management" element={<UserManagement />} />
               
            </Routes>
        </Router>
    );
}

export default App;