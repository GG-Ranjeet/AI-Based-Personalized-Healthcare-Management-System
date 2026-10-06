import React, { useState } from "react";
import { FileText, Download, Share2, ZoomIn, Printer } from "lucide-react";

const RecordsView = () => {
    const [isZoomed, setIsZoomed] = useState(false);
    
    // Using the user-provided sample report image
    const sampleReportUrl = "/reports/622pccehr08.png";

    return (
        <div className="flex-1 p-8 bg-gray-50 h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-100 rounded-xl">
                            <FileText size={32} className="text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Medical Records</h1>
                            <p className="text-gray-500 font-medium mt-1">View and manage your health reports</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                            <Share2 size={18} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm hover:bg-indigo-700 transition-colors">
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Report Viewer */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Toolbar */}
                    <div className="border-b border-gray-100 p-4 bg-gray-50/50 flex justify-between items-center">
                        <div>
                            <h2 className="font-bold text-gray-800 text-lg">Comprehensive Blood Test & EHR</h2>
                            <p className="text-sm text-gray-500">Generated on October 6, 2026 • Reference: 622pccehr08</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Zoom In/Out"
                            >
                                <ZoomIn size={20} />
                            </button>
                            <button 
                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Print"
                            >
                                <Printer size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Document Area */}
                    <div className={`p-8 bg-gray-200/40 flex justify-center items-start min-h-[600px] overflow-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                         onClick={() => setIsZoomed(!isZoomed)}>
                        <div className={`bg-white shadow-xl rounded-lg transition-all duration-300 ease-in-out ${isZoomed ? 'max-w-full w-[1200px]' : 'max-w-3xl w-full'}`}>
                            <img 
                                src={sampleReportUrl} 
                                alt="Medical Report 622pccehr08" 
                                className="w-full h-auto object-contain rounded-lg"
                                onError={(e) => {
                                    // Fallback if image not found during dev
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x1100.png?text=Medical+Report+Not+Found";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordsView;
