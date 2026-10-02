import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* SIDEBAR */}
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
        <div className="space-y-2 text-sm">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold"
          >
            ▦ &nbsp; Dashboard
          </button>

          <button
            onClick={() => navigate("/view-users")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            👥 &nbsp; User Management
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            ▣ &nbsp; Analytics
          </button>

          <button
            onClick={() => navigate("/health-outcomes")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            📈 &nbsp; Health Outcomes
          </button>

          <button
            onClick={() => navigate("/system-health")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            ⚙️ &nbsp; System Health
          </button>

          <button
            onClick={() => navigate("/audit-logs")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50"
          >
            ↶ &nbsp; Audit Logs
          </button>

        </div>

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

      {/* MAIN */}
      <main className="flex-1">

        {/* TOP BAR */}
        <header className="h-16 bg-white border-b px-7 flex items-center justify-between">

          <input
            type="text"
            placeholder="⌕  Search records, users..."
            className="w-72 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          />

          <div className="flex items-center gap-5">

            {/* Notification */}
            <button className="relative text-xl">
              🔔
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate("/settings")}
              className="text-xl"
            >
              ⚙️
            </button>

            {/* New User */}
            <button
              onClick={() => navigate("/add-user")}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              + New User
            </button>

          </div>

        </header>

        {/* DASHBOARD CONTENT */}
        <section className="p-7">

          <h1 className="text-3xl font-bold text-gray-800">
            System Overview
          </h1>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Real-time status and operational intelligence.
          </p>

          {/* TOP CARDS */}
          <div className="grid grid-cols-3 gap-5 mb-5">

            <div className="bg-white border rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500">
                Diagnostic Engine Uptime
              </p>

              <h2 className="text-3xl font-bold text-gray-800">
                99.9%
              </h2>

              <p className="text-xs text-green-600 mt-1">
                ↗️ +0.1% from last month
              </p>
            </div>

            <div className="bg-white border rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500">
                Active Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800">
                284
              </h2>

              <p className="text-xs text-green-600 mt-1">
                ↗️ +12 from last week
              </p>
            </div>

            <div className="bg-white border rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500">
                API Success Rate
              </p>

              <h2 className="text-3xl font-bold text-gray-800">
                98.5%
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                → Stable
              </p>
            </div>

          </div>

          {/* LOWER BOXES */}
          <div className="grid grid-cols-5 gap-5">
              {/* AUDIT LOGS */}
            <div className="col-span-2 bg-white border rounded-xl p-5">

              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Recent Audit Logs
              </h2>

              <div className="space-y-3">

                <div className="border-b pb-3 flex justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      AI Model Retrained (Diag-v4)
                    </p>
                    <p className="text-xs text-gray-500">
                      System Admin
                    </p>
                  </div>

                  <span className="text-xs">
                    10:42 AM
                  </span>
                </div>

                <div className="border-b pb-3 flex justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      Updated Prescription #882
                    </p>
                    <p className="text-xs text-gray-500">
                      Dr. Smith
                    </p>
                  </div>

                  <span className="text-xs">
                    09:15 AM
                  </span>
                </div>

                <div className="border-b pb-3 flex justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      New Patient Registered (ID: 994)
                    </p>
                    <p className="text-xs text-gray-500">
                      Reception Desk
                    </p>
                  </div>

                  <span className="text-xs">
                    08:30 AM
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-red-500">
                    Failed Login Attempt(IP:192.168...)
                  </p>

                  <p className="text-xs text-gray-500">
                    Unknown
                  </p>
                </div>

              </div>

              <button
                onClick={() => navigate("/audit-logs")}
                className="text-blue-600 text-xs font-semibold mt-4"
              >
                View All Logs
              </button>

            </div>

            {/* USAGE CHART */}
            <div className="col-span-3 bg-white border rounded-xl p-5">

              <h2 className="text-lg font-bold text-gray-800 mb-5">
                System Usage Trends
              </h2>

              <div className="h-56 flex items-end justify-around gap-4">

                <div className="w-16 h-28 bg-[#cbd6ef] rounded-t"></div>

                <div className="w-16 h-40 bg-[#9eb4df] rounded-t"></div>

                <div className="w-16 h-52 bg-[#6d8fd3] rounded-t"></div>

                <div className="w-16 h-52 bg-[#315db0] rounded-t"></div>

              
                
              </div>

              <div className="flex justify-around text-xs text-gray-600 mt-3">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>

            </div>

          </div>

        </section>
        <div className="mt-6 pt-4 border-t text center">
          <p className="text-sm font-semibold text-black">
          Developed by: Sakshi Tripathi
          </p>
        </div>
      

      </main>


    </div>
  );
}

export default AdminDashboard;