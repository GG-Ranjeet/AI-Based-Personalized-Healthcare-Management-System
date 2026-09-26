import "./App.css";
import Example from "./component/Example";
import LoginForm from "./auth/LoginForm";
import PatientDashboard from "./dashboard/PatientDashboard";

import { BrowserRouter, Routes, Route } from "react-router";
import SignupForm from "./auth/SignupForm";
import { Home } from "./component/Home";
import ProtectedRoute from "./component/utils/ProtectedRoute";

function App() {
    return (
        <>
            <div id="app" className="min-h-screen flex items-center justify-center gap-4 bg-gray-100">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<PatientDashboard />}>
                                <Route index element={<LoginForm />} />
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
