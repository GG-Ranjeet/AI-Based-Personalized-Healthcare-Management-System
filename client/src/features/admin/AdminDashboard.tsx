import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    uptime: "99.9%",
    activeUsers: 0,
    apiSuccessRate: "100%"
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/status/stats", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/audit", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  const deleteLog = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/audit/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchLogs();
    } catch (e) {
      console.error(e);
    }
  };

  const clearAllLogs = async () => {
    if (!confirm("Are you sure you want to delete all logs?")) return;
    try {
      const token = localStorage.getItem('token');
      await fetch("/api/audit", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setLogs([]);
    } catch (e) {
      console.error(e);
    }
  };

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
              {stats.uptime}
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
              {stats.activeUsers}
            </h2>

            <p className="text-xs text-green-600 mt-1">
              ↗️ real-time count
            </p>
          </div>

          <div className="bg-white border rounded-xl px-5 py-4">
            <p className="text-xs text-gray-500">
              API Success Rate
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {stats.apiSuccessRate}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              → Calculated live
            </p>
          </div>

        </div>

        {/* LOWER BOXES */}
        <div className="grid grid-cols-5 gap-5">
          {/* AUDIT LOGS */}
          <div className="col-span-2 bg-white border rounded-xl p-5">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Recent Audit Logs
              </h2>
              {logs.length > 0 && (
                <button
                  onClick={clearAllLogs}
                  className="text-xs text-red-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <p className="text-sm text-gray-500 italic">None</p>
              ) : (
                logs.slice(0, 5).map((log) => (
                  <div key={log._id} className="border-b pb-3 flex justify-between group relative">
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${log.status === 'FAILURE' ? 'text-red-500' : ''}`}>
                        {log.action} {log.resource_type ? `(${log.resource_type})` : ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        Actor: {log.actor_role} ({log.actor_id})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => deleteLog(log._id)}
                        className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
                        title="Delete this log"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => navigate("/admin/system-health")}
              className="text-blue-600 text-xs font-semibold mt-4 block"
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