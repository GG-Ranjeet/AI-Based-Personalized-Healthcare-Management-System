import { useEffect, useState } from "react";
import Selector2 from "../utils/Selector2.tsx";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Calendar, FileText, Settings, HelpCircle, AlertTriangle } from "lucide-react";

const SidePanel = () => {
    const [selectedPage, setSelectedPage] = useState(1);
    const [isMinimized, setIsMinimized] = useState(false);
    const navigate = useNavigate();
    const options = [
        {
            id: 1,
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            selected: true,
        },
        {
            id: 2,
            name: "Chat",
            icon: <MessageSquare size={20} />,
            selected: false,
        },
        {
            id: 3,
            name: "Appointment",
            icon: <Calendar size={20} />,
            selected: false,
        },
        {
            id: 5,
            name: "Medical Records",
            icon: <FileText size={20} />,
            selected: false,
        },
    ];

    const handlePageChange = (pageId: number) => {
        setSelectedPage(pageId);
    };

    useEffect(() => {
        switch (selectedPage){
            case 1:
                navigate("/dashboard/");
                break;
            case 2:
                navigate("chat");
                break;
            case 3:
                navigate("appointment");
                break;
            case 5:
                navigate("records");
                break;
            default:
                navigate("example");
            
        }
    }, [selectedPage]);

    return (
        <div className={`flex flex-col items-center ${!isMinimized ? 'md:items-start md:p-4' : 'md:items-center md:w-20'} gap-4  bg-gray-50 h-full p-2 border-r border-gray-200 shadow-md transition-all duration-300 w-20 md:w-auto`}>
            {/* top */}
            <div 
                className="flex flex-col items-center justify-center w-full py-4 cursor-pointer"
                onClick={() => setIsMinimized(!isMinimized)}
                title="Toggle Sidebar"
            >
                <h1 className={`text-indigo-700 font-bold text-2xl hidden ${!isMinimized ? 'md:block' : ''}`}>MediFlow AI</h1>
                <h1 className={`text-indigo-700 font-bold text-xl ${!isMinimized ? 'md:hidden' : ''}`} title="MediFlow AI">M</h1>
            </div>

            {/* middle */}
            <div className="flex flex-col items-start gap-4 w-full h-2/4 ">
            
                <Selector2
                    type="selector"
                    options={options}
                    alignment="col"
                    selected={selectedPage}
                    handler={handlePageChange}
                    className="w-full gap-2 p-1 text-start"
                    isMinimized={isMinimized}
                ></Selector2>
            </div>

            <hr className="w-full" />

            {/* bottom */}
            <div className="w-full flex flex-col mt-auto pb-4 gap-2">
                {/* setting */}
                <div 
                    className={`flex flex-row items-center justify-center ${!isMinimized ? 'md:justify-start' : ''} gap-3 w-full p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors`} 
                    title="Settings"
                    onClick={() => navigate("settings")}
                >
                    <Settings className="text-slate-600 shrink-0" size={24} />
                    <p className={`font-medium text-sm text-slate-700 hidden ${!isMinimized ? 'md:block' : ''}`}>Settings</p>
                </div>

                <div 
                    className={`flex flex-row items-center justify-center ${!isMinimized ? 'md:justify-start' : ''} gap-3 w-full p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors`} 
                    title="Help"
                >
                    <HelpCircle className="text-slate-600 shrink-0" size={24} />
                    <p className={`font-medium text-sm text-slate-700 hidden ${!isMinimized ? 'md:block' : ''}`}>Help</p>
                </div>

                {/* emergency */}
                <div className="mt-2 w-full px-1">
                    <button 
                        className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-2 px-0 ${!isMinimized ? 'md:px-4' : ''} rounded-xl w-full flex justify-center items-center gap-2 transition-colors shadow-sm`} 
                        title="Emergency"
                        onClick={() => navigate("emergency")}
                    >
                        <AlertTriangle className={`w-5 h-5 ${!isMinimized ? 'md:hidden' : ''}`} />
                        <span className={`hidden ${!isMinimized ? 'md:block' : ''}`}>Emergency</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
