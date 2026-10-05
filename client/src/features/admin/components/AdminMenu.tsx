import { useNavigate, useLocation } from "react-router-dom"

const AdminMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getBtnClass = (path: string) => {
        const isActive = location.pathname === path || (path === "/admin/dashboard" && location.pathname === "/admin");
        return isActive 
            ? "w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold"
            : "w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition";
    };

    return (
        <div className="space-y-2 text-sm">

            <button
                onClick={() => navigate("/admin/dashboard")}
                className={getBtnClass("/admin/dashboard")}
            >
                ▦ &nbsp; Dashboard
            </button>

            <button
                onClick={() => navigate("/admin/view-users")}
                className={getBtnClass("/admin/view-users")}
            >
                👥 &nbsp; User Management
            </button>

            <button
                onClick={() => navigate("/admin/analytics")}
                className={getBtnClass("/admin/analytics")}
            >
                ▣ &nbsp; Analytics
            </button>

            <button
                onClick={() => navigate("/admin/system-health")}
                className={getBtnClass("/admin/system-health")}
            >
                ⚙️ &nbsp; System Health
            </button>

        </div>
    )
}

export default AdminMenu;