import { useNavigate } from "react-router-dom"
import AdminMenu from "./AdminMenu";

const AdminSidebar = () => {

    const navigate = useNavigate();


    return (
        <aside className="w-64 bg-white border-r px-5 py-6 flex flex-col">

        {/* Logo / Name */}
        {/* Aegis Admin Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-4">

            {/* Aura Health Logo */}
            <div className="w-16 h-16 flex flex-col items-center justify-center">

              <svg
                viewBox="0 0 100 100"
                className="w-14 h-14"
                fill="none"
              >
                {/* Wings */}
                <path
                  d="M48 28 C34 15 15 18 5 25 C20 27 30 32 42 38"
                  stroke="#1677A8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <path
                  d="M52 28 C66 15 85 18 95 25 C80 27 70 32 58 38"
                  stroke="#1677A8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Medical Rod */}
                <path
                  d="M50 20 V78"
                  stroke="#1677A8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Medical Cross */}
                <path
                  d="M43 43 H57 M50 36 V50"
                  stroke="#1677A8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Heart */}
                <path
                  d="M50 65
             C40 52 25 58 30 69
             C35 79 50 86 50 86
             C50 86 65 79 70 69
             C75 58 60 52 50 65Z"
                  stroke="#1677A8"
                  strokeWidth="3"
                />

                {/* AI Network Dots */}
                <circle cx="18" cy="55" r="4" fill="#1677A8" />
                <circle cx="82" cy="55" r="4" fill="#1677A8" />
                <circle cx="25" cy="78" r="4" fill="#1677A8" />
                <circle cx="75" cy="78" r="4" fill="#1677A8" />

                {/* Network Lines */}
                <path
                  d="M18 55 L25 78 L50 86 L75 78 L82 55"
                  stroke="#1677A8"
                  strokeWidth="2"
                />

              </svg>

              <span className="text-[6px] font-bold text-slate-700 tracking-wide">
                AURA HEALTH
              </span>

            </div>

            {/* Aegis Text */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 leading-tight">
                Aegis Admin
              </h2>

              <p className="text-[11px] font-semibold text-gray-800 leading-tight mt-1">
                Regional Hospital
              </p>

              <p className="text-[11px] font-semibold text-gray-800 leading-tight">
                Group
              </p>
            </div>

          </div>
        </div>
        {/* MENU */}
        <AdminMenu></AdminMenu>

        {/* BOTTOM MENU */}
        <div className="mt-auto space-y-2 text-sm">

          <button
            onClick={() => navigate("/support")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            🎧 &nbsp; Support
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            ↪️ &nbsp; Sign Out
          </button>

        </div>

      </aside>
    )
}

export default AdminSidebar;