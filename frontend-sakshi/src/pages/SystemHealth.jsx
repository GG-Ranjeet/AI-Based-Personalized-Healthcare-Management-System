import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SystemHealth() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState("All Action Types");
  const [timeFilter, setTimeFilter] = useState("Last 24 Hours");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const logs = [
    {
      time: "2023-10-27 14:32:01",
      user: "Dr. J. Doe",
      avatar: "JD",
      type: "DATA_EXPORT",
      detail: "Exported patient list for Clinic A",
    },
    {
      time: "2023-10-27 14:15:22",
      user: "System API",
      avatar: "⚙️",
      type: "AUTH_FAIL",
      detail: "Invalid API key attempt (Production_v1)",
    },
    {
      time: "2023-10-27 13:50:00",
      user: "Admin (Current)",
      avatar: "A",
      type: "SETTINGS_UPDATE",
      detail: "Modified system notification thresholds",
    },
    {
      time: "2023-10-27 12:00:05",
      user: "System Cron",
      avatar: "⚙️",
      type: "DB_BACKUP",
      detail: "Automated daily database snapshot completed",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const text =
      '${log.user} ${log.type} ${log.detail}.toLowerCase()';

    const searchMatch = text.includes(search.toLowerCase());

    const typeMatch =
      actionType === "All Action Types" ||
      log.type === actionType;

    return searchMatch && typeMatch;
  });

  const menu = [
    ["Dashboard", "▦", "/dashboard"],
    ["User Management", "👥", "/user-management"],
    ["Analytics", "▣", "/analytics"],
    ["Health Outcomes", "📈", "/health-outcomes"],
    ["System Health", "⚙️", "/system-health"],
    ["Audit Logs", "↶", "/audit-logs"],
  ];

  const refreshData = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  const exportLogs = () => {
    const rows = [
      ["Timestamp", "User / System", "Action Type", "Details"],
      ...filteredLogs.map((log) => [
        log.time,
        log.user,
        log.type,
        log.detail,
      ]),
    ];

    const csv = rows
      .map((row) => row.map((item) => "${item}").join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "audit-logs.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    window.print();
  };

  const support = () => {
    alert("Support Channel opened.");
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex text-[#172033]">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 bottom-0 w-[215px] bg-white border-r border-[#e1e5eb] flex flex-col">

        {/* LOGO */}
        <div className="px-5 pt-5 pb-6">

          <div className="flex items-center gap-2.5">

            {/* Small Logo */}
            <div
              className="w-[36px] h-[36px] rounded-lg bg-[#edf4ff] border border-[#d9e4f4] flex items-center justify-center shrink-0"
            >
              <div className="w-[23px] h-[23px] rounded-md bg-[#2162c4] text-white flex items-center justify-center text-[13px] font-bold">
                ✚
              </div>
            </div>

            <div>
              <div className="text-[17px] leading-[20px] font-bold text-[#1559b7]">
                Aegis Admin
              </div>

              <div className="text-[9px] leading-[12px] text-gray-500 mt-1">
                Regional Hospital
              </div>

              <div className="text-[9px] leading-[12px] text-gray-500">
                Group
              </div>
            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="px-3 flex-1">

          {menu.map(([name, icon, path]) => {

            const active = name === "System Health";

            return (
              <button
                key={name}
                onClick={() => navigate(path)}
                className={`w-full h-[40px] mb-1 rounded-md flex items-center gap-3 px-3 transition
                ${
                  active
                    ? "bg-[#edf4ff] text-[#175bb9] border-r-[3px] border-[#2162c4]"
                    : "text-[#4d5666] hover:bg-[#f5f7fa]"
                }`}
              >

                <span
                  className={`w-[20px] text-center text-[17px]
                  ${active ? "text-[#2162c4]" : "text-[#596273]"}`}
                >
                  {icon}
                </span>

                <span className="text-[12px] font-medium whitespace-nowrap">
                  {name}
                </span>

              </button>
            );
          })}

        </div>

        {/* BOTTOM */}
        <div className="px-3 pb-4">

          <div className="border-t border-[#e3e6eb] mb-4"></div>

          <button
            onClick={generateReport}
            className="w-full h-[36px] rounded-md bg-[#2162c4] hover:bg-[#174fa6] text-white text-[12px] font-semibold"
          >
            + &nbsp; Generate Report
          </button>

          <button
            onClick={support}
            className="w-full h-[38px] mt-2 rounded-md flex items-center gap-3 px-3 text-[#4d5666] hover:bg-[#f5f7fa]"
          >
            <span className="text-[17px]">🎧</span>
            <span className="text-[12px]">Support</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full h-[38px] rounded-md flex items-center gap-3 px-3 text-[#4d5666] hover:bg-[#f5f7fa]"
          >
            <span className="text-[18px]"> ↪️</span>
            <span className="text-[12px]">Sign Out</span>
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="ml-[215px] w-[calc(100%-215px)] min-h-screen px-7 py-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <div className="text-[23px] font-bold leading-[28px] text-[#172033] whitespace-nowrap">
              System Health & Audit Logs
            </div>

            <div className="text-[12px] text-gray-500 mt-1">
              Monitor server status, AI model performance, and review system activities.
            </div>
          </div>

          <div className="flex gap-2.5">

            <button
              onClick={exportLogs}
              className="h-[36px] px-4 bg-white border border-[#d5dbe5] rounded-md text-[11px] font-medium hover:bg-gray-50 whitespace-nowrap"
            >
              ⇩ &nbsp; Export Logs
            </button>

            <button
              onClick={refreshData}
              className="h-[36px] px-4 bg-[#2162c4] text-white rounded-md text-[11px] font-semibold hover:bg-[#174fa6] whitespace-nowrap"
            >
              ↻ &nbsp;
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>

          </div>

        </div>

        {/* ================= STATUS CARDS ================= */}
        <div className="grid grid-cols-4 gap-4 mb-5">

          {/* CARD */}
          <div className="h-[88px] bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

            <div>
              <div className="text-[10px] text-gray-500">
                Overall Status
              </div>

              <div className="text-[17px] font-bold mt-2">
                Operational
              </div>
            </div>

            <div className="w-[36px] h-[36px] rounded-full bg-[#d7fae9] text-[#20b77a] flex items-center justify-center text-[18px]">
              ✓
            </div>

          </div>

          {/* CARD */}
          <div className="h-[88px] bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

            <div>
              <div className="text-[10px] text-gray-500">
                API Latency
              </div>

              <div className="text-[17px] font-bold mt-2">
                42
                <span className="text-[10px] text-gray-500 ml-1">
                  ms
                </span>
              </div>
            </div>

            <div className="w-[36px] h-[36px] rounded-full bg-[#d7fae9] text-[#20b77a] flex items-center justify-center text-[16px]">
              ◔
            </div>

          </div>

          {/* CARD */}
          <div className="h-[88px] bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

            <div>
              <div className="text-[10px] text-gray-500">
                AI Inference
              </div>

              <div className="text-[17px] font-bold mt-2">
                1.2
                <span className="text-[10px] text-gray-500 ml-1">
                  k req/s
                </span>
              </div>
            </div>

            <div className="w-[36px] h-[36px] rounded-full bg-[#d7fae9] text-[#20b77a] flex items-center justify-center text-[15px]">
              ⚙️
            </div>

          </div>

          {/* CARD */}
          <div className="h-[88px] bg-white border border-[#dfe4eb] rounded-lg px-4 flex items-center justify-between shadow-sm">

            <div>
              <div className="text-[10px] text-gray-500">
                Database Load
              </div>

              <div className="text-[17px] font-bold text-[#b0444c] mt-2">
                78
                <span className="text-[10px] ml-1">
                  %
                </span>
              </div>
            </div>

            <div className="w-[36px] h-[36px] rounded-full bg-[#ffe1e1] text-[#d95c5c] flex items-center justify-center text-[16px]">
              ⚠️
            </div>

          </div>

        </div>

        {/* ================= AUDIT BOX ================= */}
        <div className="bg-white border border-[#dfe4eb] rounded-lg shadow-sm">

          {/* AUDIT TOP */}
          <div className="h-[62px] px-5 flex items-center justify-between border-b border-[#e5e8ee]">

            <div className="flex items-center gap-2">

              <span className="text-[#2162c4] text-[18px]">
                ▤
              </span>

              <span className="text-[16px] font-bold">
                Audit Log
              </span>

            </div>

            <div className="flex gap-2">

              {/* SEARCH */}
              <div className="relative">

                <span className="absolute left-2.5 top-[9px] text-gray-400 text-[13px]">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search logs..."
                  className="w-[190px] h-[34px] pl-8 pr-2 border border-[#d9dfe8] rounded-md outline-none focus:border-[#2162c4] text-[11px]"
                />

              </div>

              {/* ACTION */}
              <select
                value={actionType}
                onChange={(e) => {
                  setActionType(e.target.value);
                  setPage(1);
                }}
                className="w-[145px] h-[34px] px-2 border border-[#d9dfe8] rounded-md bg-white text-[11px] outline-none"
              >
                <option>All Action Types</option>
                <option>DATA_EXPORT</option>
                <option>AUTH_FAIL</option>
                <option>SETTINGS_UPDATE</option>
                <option>DB_BACKUP</option>
              </select>

              {/* TIME */}
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-[120px] h-[34px] px-2 border border-[#d9dfe8] rounded-md bg-white text-[11px] outline-none"
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
                      {log.time}
                    </td>

                    <td className="py-3 px-3">

                      <div className="flex items-center gap-2">

                        <div className="w-[27px] h-[27px] rounded-full bg-[#e7f0ff] text-[#2162c4] flex items-center justify-center text-[9px] font-bold">
                          {log.avatar}
                        </div>

                        <span className="text-[11px] text-[#394354]">
                          {log.user}
                        </span>

                      </div>

                    </td>

                    <td className="py-3 px-3">

                      <span
                        className={`px-2 py-1 rounded text-[9px] font-semibold ${
                          log.type === "AUTH_FAIL"
                            ? "bg-[#ffe1e1] text-[#c84d56]"
                            : "bg-[#e5efff] text-[#2162c4]"
                        }`}
                      >
                        {log.type}
                      </span>

                    </td>

                    <td className="py-3 px-3 text-[11px] text-gray-600">
                      {log.detail}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-4">

              <div className="text-[10px] text-gray-500">
                Showing {filteredLogs.length} of 2,451 entries
              </div>

              {/* PAGINATION */}
              <div className="flex items-center gap-1.5">

                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className="w-[29px] h-[29px] border border-[#dce1e8] rounded-md text-gray-500 hover:bg-gray-50 text-[13px]"
                >
                  ‹
                </button>

                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-[29px] h-[29px] rounded-md border text-[11px] ${
                      page === num
                        ? "border-[#2162c4] bg-[#edf4ff] text-[#2162c4] font-bold"
                        : "border-[#dce1e8] text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(3, page + 1))}
                  className="w-[29px] h-[29px] border border-[#dce1e8] rounded-md text-gray-500 hover:bg-gray-50 text-[13px]"
                >
                  ›
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default SystemHealth;