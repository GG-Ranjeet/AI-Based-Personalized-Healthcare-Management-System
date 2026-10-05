import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>

      {/* DASHBOARD CONTENT */}
      <section className="">

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

    </div>

  );
}

export default AdminDashboard;