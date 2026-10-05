import React from "react";
import { Settings, User, Bell, Lock, Shield } from "lucide-react";

const SettingsView = () => {
    return (
        <div className="flex-1 p-8 bg-gray-50 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Settings size={32} className="text-indigo-600" />
                Settings
            </h1>

            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 text-indigo-600">
                        <User size={24} />
                        <h2 className="text-xl font-semibold text-gray-800">Account</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                            <div>
                                <p className="font-medium text-gray-700">Profile Information</p>
                                <p className="text-sm text-gray-500">Update your name, email, and photo</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">Edit</button>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                            <div>
                                <p className="font-medium text-gray-700">Medical History</p>
                                <p className="text-sm text-gray-500">Manage your connected health records</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">Manage</button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 text-indigo-600">
                        <Bell size={24} />
                        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                            <div>
                                <p className="font-medium text-gray-700">Appointment Reminders</p>
                                <p className="text-sm text-gray-500">Get alerted before appointments</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                            <div>
                                <p className="font-medium text-gray-700">AI Chat Suggestions</p>
                                <p className="text-sm text-gray-500">Receive proactive health insights</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Privacy & Security */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4 text-indigo-600">
                        <Shield size={24} />
                        <h2 className="text-xl font-semibold text-gray-800">Privacy & Security</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                            <Lock className="text-gray-400 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-gray-700">Change Password</p>
                                <p className="text-sm text-gray-500 mb-3">Ensure your account stays secure</p>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Update Password</button>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                            <Shield className="text-gray-400 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-gray-700">Data Sharing</p>
                                <p className="text-sm text-gray-500 mb-3">Manage who sees your records</p>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Manage Access</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
