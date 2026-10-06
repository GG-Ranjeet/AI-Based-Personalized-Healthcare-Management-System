import React from "react";
import { AlertCircle, PhoneCall, Navigation, Clock, ShieldAlert, FileText } from "lucide-react";

const EmergencyView = () => {
    return (
        <div className="flex-1 p-8 bg-red-50 h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-200">
                        <AlertCircle size={40} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-red-700">Emergency Center</h1>
                        <p className="text-red-500 font-medium mt-1">If this is a life-threatening medical emergency, call 911 immediately.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Quick Call */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-red-100/50 border-2 border-red-100 transform transition-all hover:scale-[1.02]">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <PhoneCall size={40} className="text-red-600 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Emergency Hotline</h2>
                            <p className="text-gray-500 mb-6">24/7 direct line to our on-call medical trauma team.</p>
                            <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-2xl shadow-lg transition-colors">
                                Call Now (1-800-EMERG)
                            </button>
                        </div>
                    </div>

                    {/* Nearest Hospital */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-red-100/50 border border-gray-100">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <Navigation size={40} className="text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nearest ER Center</h2>
                            <p className="text-gray-500 mb-6">City Central Trauma Center is 2.4 miles away from your location.</p>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl shadow-lg transition-colors">
                                Get Directions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Guidelines */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <ShieldAlert className="text-red-500" /> What to do while waiting
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <Clock className="text-gray-600 mb-3" size={24} />
                            <h3 className="font-bold text-gray-800 mb-1">Stay Calm</h3>
                            <p className="text-sm text-gray-600">Keep the patient warm and still. Do not move them unless they are in immediate danger.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <ShieldAlert className="text-gray-600 mb-3" size={24} />
                            <h3 className="font-bold text-gray-800 mb-1">Clear the Area</h3>
                            <p className="text-sm text-gray-600">Ensure there is a clear path for EMS responders to reach the patient quickly.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <FileText className="text-gray-600 mb-3" size={24} />
                            <h3 className="font-bold text-gray-800 mb-1">Gather Info</h3>
                            <p className="text-sm text-gray-600">Collect any relevant medical records, medications, or allergy information to give to paramedics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyView;
