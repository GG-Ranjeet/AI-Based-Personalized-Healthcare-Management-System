import React, { useState } from "react";
import Selector from "../component/utils/Selector";
import Checkbox from "../component/utils/Checkbox";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState(1);

    const roles = [
        { id: 1, name: "Patient" },
        { id: 2, name: "Doctor" },
        { id: 3, name: "Admin" },
    ];

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleRoleChange = (id: number) => {
        setSelectedRole(id);
    }
    const handleLoginForm = async (e: React.BaseSyntheticEvent<SubmitEvent, HTMLFormElement, HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const role = roles[selectedRole - 1].name; // Get the role name based on the selectedRole index
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("Form submitted with values:", { role, email, password });

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role, email, password }),
            });
            console.log("Response:", response);
            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                localStorage.setItem('token', data.token);

                // Add role-based redirection
                if (role.toLowerCase() === "patient") {
                    window.location.href = "/patient";
                } else if (role.toLowerCase() === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/dashboard";
                }
            } else {
                const result = await response.json();
                console.error("Login failed:", result.message);
                if (result.message) {
                    alert(`Login failed: ${result.message}`);
                } else {
                    alert("Login failed. Please check your details and try again.");
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }


    return (
        <div className="flex-1 flex items-center justify-center w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md flex flex-col items-center gap-6">
                
                {/* Logo and Header */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md mb-2">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">MediFlow AI</h1>
                    <p className="text-sm text-slate-500 font-medium">Secure Medical Access Portal</p>
                </div>

                {/* Form Card */}
                <div className="w-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleLoginForm}>
                        <div>
                            <label htmlFor="selector" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                Select Access Role
                            </label>
                            <Selector name="role" type="selector" options={roles} selected={selectedRole} handler={handleRoleChange}></Selector>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email or Member ID
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 sm:text-sm"
                                    placeholder="e.g. john.doe@example.com"
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 sm:text-sm"
                                    placeholder="••••••••"
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Checkbox props={{ id: "remember-me", name: "remember-me" }}>
                                <span className="ml-2 text-sm text-slate-600 font-medium">
                                    Remember this device for 30 days
                                </span>
                            </Checkbox>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            Sign In to Portal
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600 font-medium">
                            New to MediFlow?{" "}
                            <a href="/signup" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
                                Create an Account
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="flex flex-col items-center gap-2 mt-4 text-xs text-slate-500 font-medium">
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-700 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-700 transition-colors">Technical Support</a>
                    </div>
                    <p>© 2024 MediFlow AI Systems. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
