import { useState, useEffect } from "react";
import { CheckCircle2, Activity, Settings2, AlertTriangle, FileText, Search } from "lucide-react";

function SystemHealth() {

  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState("All Action Types");
  const [timeFilter, setTimeFilter] = useState("Last 24 Hours");
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState<any[]>([]);
  const [health, setHealth] = useState({
    status: "Operational",
    aiUsage: "0.0 k req/s",
    aiCredits: 1000,
    dbLoad: "10%"
  });
  const [latency, setLatency] = useState<number | null>(() => {
    const saved = localStorage.getItem('lastPing');
    return saved ? parseInt(saved) : null;
  });

  const fetchHealth = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/status/health", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setHealth(data.health);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pingApi = async () => {
    try {
      const token = localStorage.getItem('token');
      const start = Date.now();
      await fetch("/api/status/ping", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const end = Date.now();
      const latencyMs = end - start;
      setLatency(latencyMs);
      localStorage.setItem('lastPing', latencyMs.toString());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
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
    fetchLogs();
    fetchHealth();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const text = `${log.actor_role} ${log.actor_id} ${log.action} ${log.resource_type}`.toLowerCase();

    const searchMatch = text.includes(search.toLowerCase());

    const typeMatch =
      actionType === "All Action Types" ||
      log.action === actionType;

    return searchMatch && typeMatch;
  });


  // const refreshData = () => {
  //   setRefreshing(true);

  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 700);
  // };

  // const exportLogs = () => {
  //   const rows = [
  //     ["Timestamp", "User / System", "Action Type", "Details"],
  //     ...filteredLogs.map((log) => [
  //       log.time,
  //       log.user,
  //       log.type,
  //       log.detail,
  //     ]),
  //   ];

  //   const csv = rows
  //     .map((row) => row.map((item) => "${item}").join(","))
  //     .join("\n");

  //   const blob = new Blob([csv], {
  //     type: "text/csv;charset=utf-8;",
  //   });

  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");

  //   a.href = url;
  //   a.download = "audit-logs.csv";
  //   a.click();

  //   URL.revokeObjectURL(url);
  // };


  return (
    <section>

      

      {/* ================= STATUS CARDS ================= */}
      <div className="grid grid-cols-4 gap-4 mb-5">

        {/* CARD */}
        <div className="h-22 bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

          <div>
            <div className="text-[10px] text-gray-500">
              Overall Status
            </div>

            <div className="text-[17px] font-bold mt-2">
              {health.status}
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#d7fae9] text-[#20b77a] flex items-center justify-center text-[18px]">
            <CheckCircle2 size={18} />
          </div>

        </div>

        {/* CARD */}
        <div className="h-22 bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

          <div>
            <div className="text-[10px] text-gray-500">
              API Latency
            </div>

            <div className="text-[17px] font-bold mt-2">
              {latency === null ? "--" : latency}
              <span className="text-[10px] text-gray-500 ml-1">
                ms
              </span>
            </div>
          </div>

          <button 
            onClick={pingApi}
            className="w-9 h-9 rounded-full bg-[#d7fae9] text-[#20b77a] flex items-center justify-center text-[16px] hover:bg-[#c1ead6] transition active:scale-95 cursor-pointer"
            title="Ping API"
          >
            <Activity size={18} />
          </button>

        </div>

        {/* CARD */}
        <div className="h-22 bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

          <div>
            <div className="text-[10px] text-gray-500">
              AI Inference
            </div>

            <div className="text-[17px] font-bold mt-2">
              {health.aiUsage}
              <span className="text-[10px] text-gray-500 ml-1 block mt-0.5">
                {health.aiCredits} Credits Remaining
              </span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#d7fae9] text-[#20b77a] flex items-center justify-center text-[15px]">
            <Settings2 size={18} />
          </div>

        </div>

        {/* CARD */}
        <div className="h-22 bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

          <div>
            <div className="text-[10px] text-gray-500">
              Database Load
            </div>

            <div className="text-[17px] font-bold text-[#b0444c] mt-2">
              {health.dbLoad}
              <span className="text-[10px] ml-1">
                %
              </span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#ffe1e1] text-[#d95c5c] flex items-center justify-center text-[16px]">
            <AlertTriangle size={18} />
          </div>

        </div>

      </div>

      {/* ================= AUDIT BOX ================= */}
      <div className="bg-white border border-[#dfe4eb] rounded-lg shadow-sm">

        {/* AUDIT TOP */}
        <div className="h-15.5 px-5 flex items-center justify-between border-b border-[#e5e8ee]">

          <div className="flex items-center gap-2">

            <span className="text-[#2162c4] text-[18px]">
              <FileText size={20} />
            </span>

            <span className="text-[16px] font-bold">
              Audit Log
            </span>

          </div>

          <div className="flex gap-2">

            {/* SEARCH */}
            <div className="relative">

              <span className="absolute left-2.5 top-2.5 text-gray-400">
                <Search size={14} />
              </span>

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search logs..."
                className="w-47.5 h-8.5 pl-8 pr-2 border border-[#d9dfe8] rounded-md outline-none focus:border-[#2162c4] text-[11px]"
              />

            </div>

            <select
              value={actionType}
              onChange={(e) => {
                setActionType(e.target.value);
                setPage(1);
              }}
              className="w-36.25 h-8.5 px-2 border border-[#d9dfe8] rounded-md bg-white text-[11px] outline-none"
            >
              <option>All Action Types</option>
              {Array.from(new Set(logs.map(l => l.action))).map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>

            {/* TIME */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-30 h-8.5 px-2 border border-[#d9dfe8] rounded-md bg-white text-[11px] outline-none"
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>

          </div>

        </div>

        {/* TABLE */}
        <div className="px-5 py-4">

          <table className="w-full">

            <thead>
              <tr className="bg-[#eef4ff]">

                <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#414b5b]">
                  Timestamp
                </th>

                <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#414b5b]">
                  User / System
                </th>

                <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#414b5b]">
                  Action Type
                </th>

                <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#414b5b]">
                  Details
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredLogs.map((log, index) => (

                <tr
                  key={index}
                  className="border-b border-[#e8ebf0]"
                >

                  <td className="py-3 px-3 text-[11px] text-gray-600">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td className="py-3 px-3">

                    <div className="flex items-center gap-2">

                      <div className="w-6.75 h-6.75 rounded-full bg-[#e7f0ff] text-[#2162c4] flex items-center justify-center text-[9px] font-bold">
                        {log.actor_role?.[0]?.toUpperCase() || 'U'}
                      </div>

                      <span className="text-[11px] text-[#394354]">
                        {log.actor_role} ({log.actor_id})
                      </span>

                    </div>

                  </td>

                  <td className="py-3 px-3">

                    <span
                      className={`px-2 py-1 rounded text-[9px] font-semibold ${log.status === "FAILURE"
                        ? "bg-[#ffe1e1] text-[#c84d56]"
                        : log.status === "WARNING"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-[#e5efff] text-[#2162c4]"
                        }`}
                    >
                      {log.action}
                    </span>

                  </td>

                  <td className="py-3 px-3 text-[11px] text-gray-600">
                    {log.resource_type ? `${log.resource_type} ${log.resource_id ? `#${log.resource_id}` : ''}` : 'System Action'}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-4">

            <div className="text-[10px] text-gray-500">
              Showing {filteredLogs.length} entries
            </div>

            {/* PAGINATION */}
            <div className="flex items-center gap-1.5">

              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                className="w-7.25 h-7.25 border border-[#dce1e8] rounded-md text-gray-500 hover:bg-gray-50 text-[13px]"
              >
                ‹
              </button>

              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-7.25 h-7.25 rounded-md border text-[11px] ${page === num
                    ? "border-[#2162c4] bg-[#edf4ff] text-[#2162c4] font-bold"
                    : "border-[#dce1e8] text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(3, page + 1))}
                className="w-7.25 h-7.25 border border-[#dce1e8] rounded-md text-gray-500 hover:bg-gray-50 text-[13px]"
              >
                ›
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default SystemHealth;