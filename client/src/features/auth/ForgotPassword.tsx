import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // TODO: Integrate backend password reset logic here
        console.log("Password reset requested for:", email);
        
        // Simulate a successful API call for now
        setTimeout(() => {
            setIsSubmitted(true);
        }, 500);
    }

    return (
        <div className="flex-1 flex items-center justify-center w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md flex flex-col items-center gap-6">
                
                {/* Logo and Header */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md mb-2">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reset Password</h1>
                    <p className="text-sm text-slate-500 font-medium text-center">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Form Card */}
                <div className="w-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100">
                    {!isSubmitted ? (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
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

                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 flex justify-center items-center gap-2"
                            >
                                Send Reset Link
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Check Your Email</h3>
                            <p className="text-sm text-slate-500 font-medium">
                                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600 font-medium">
                            Remember your password?{" "}
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="flex flex-col items-center gap-2 mt-4 text-xs text-slate-500 font-medium">
                    <p>© 2024 MediFlow AI Systems. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
