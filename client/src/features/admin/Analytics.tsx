import { useState } from "react";

function Analytics() {
  const [showFilter, setShowFilter] = useState(false);

  const regions = [
    ["North Region", "4 active alerts", "Action Required", "red"],
    ["South Region", "2 active alerts", "Monitoring", "orange"],
    ["East Region", "0 active alerts", "Stable", "green"],
    ["West Region", "0 active alerts", "Stable", "green"],
  ];

  const csvDownload = () => {
    const csv =
      "Metric,Value\nAI Diagnostic Accuracy,94%\nMedication Adherence,90%\nPost-Op Orthopedics,88%\nCardiology Readmission Avoidance,76%\nRespiratory Rehabilitation,92%";

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "analytics.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (

    <section>

      <div className="flex justify-between items-start mb-7">

        <div>

          <h1 className="text-[30px] font-bold whitespace-nowrap">
            Analytics & Outcomes
          </h1>

          <p className="text-[15px] text-gray-600 mt-2">
            System-wide performance, predictive accuracy, and regional
            health trends.
          </p>

        </div>

        <div className="flex gap-6 items-start pl-4">

          <button
            onClick={csvDownload}
            className="h-11.25 px-5 bg-white border border-gray-300 rounded-lg text-[#315f9f] text-[12px] font-semibold"
          >
            ↓ Export CSV
          </button>

          <button
            onClick={() => window.print()}
            className="h-11.25 px-5 bg-[#2f61b5] text-white rounded-lg text-[12px] font-semibold"
          >
            ▣ Export PDF
          </button>

        </div>

      </div>

      {/* ================= TOP CARDS ================= */}

      <div className="grid grid-cols-2 gap-6 mb-6">

        <button
          onClick={() => alert("AI Diagnostic Accuracy: 94%")}
          className="text-left bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md"
        >

          <div className="flex justify-between">

            <h2 className="text-[17px] font-bold">
              AI Diagnostic Accuracy
            </h2>

            <span className="text-gray-500">
              ♧
            </span>

          </div>

          <div className="mt-5 flex items-center gap-3 ">

            <span className="text-[40px] font-bold text-black">
              94%
            </span>

            <span className="text-[12px] font-bold text-green-700">
              +2.1% MoM
            </span>

          </div>

          <p className="text-[13px] text-gray-600 mt-3">
            Model convergence remains strong across primary care pathways.
          </p>

        </button>

        <button
          onClick={() => alert("Medication Adherence: 90%")}
          className="text-left bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md"
        >

          <div className="flex justify-between">

            <h2 className="text-[17px] font-bold">
              Medication Adherence
            </h2>

            <span className="px-3 py-2 bg-[#edf3ff] text-[#55719a] rounded-md text-[11px] font-bold">
              Last 30 Days
            </span>

          </div>

          <div className="mt-5 flex items-center gap-3">

            <span className="text-[40px] font-bold text-black">
              90%
            </span>

            <span className="text-[12px] font-bold text-green-700">
              +5.0% MoM
            </span>

          </div>

          <p className="text-[13px] text-gray-600 mt-3">
            Consistent improvement in patient prescription fulfillment.
          </p>

        </button>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="grid grid-cols-2 gap-6">

        {/* REGIONAL HEALTH STATUS */}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-[18px] font-bold">
              Regional Health Status
            </h2>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="text-[#59759b] text-[12px] font-semibold"
            >
              Filter ▼
            </button>

          </div>

          {showFilter && (

            <div className="mb-3 border border-gray-200 rounded-lg bg-white">

              {[
                "All Regions",
                "North Region",
                "South Region",
                "East Region",
                "West Region",
              ].map((name) => (

                <button
                  key={name}
                  onClick={() => setShowFilter(false)}
                  className="block w-full text-left px-3 py-2 text-[11px] hover:bg-gray-100"
                >
                  {name}
                </button>

              ))}

            </div>

          )}

          {regions.map((region) => (

            <button
              key={region[0]}
              onClick={() =>
                alert(
                  region[0] +
                  "\n" +
                  region[1] +
                  "\n" +
                  region[2]
                )
              }
              className="w-full py-4 border-b border-gray-200 flex justify-between items-center text-left hover:bg-gray-50"
            >

              <div>

                <div className="text-[15px] font-bold">
                  {region[0]}
                </div>

                <div className="text-[12px] text-gray-600 mt-1">
                  {region[1]}
                </div>

              </div>

              <span
                className={
                  "px-3 py-2 rounded-md text-[11px] font-bold " +
                  (region[3] === "red"
                    ? "bg-red-100 text-red-600"
                    : region[3] === "orange"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-600")
                }
              >
                {region[2]}
              </span>

            </button>

          ))}

        </div>

        {/* RECOVERY TRAJECTORIES */}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          <h2 className="text-[18px] font-bold mb-7">
            Recovery Trajectories
          </h2>

          {/* POST OP */}

          <button
            onClick={() => alert("Post-Op Orthopedics: 88%")}
            className="w-full text-left mb-7"
          >

            <div className="flex justify-between mb-2">

              <span className="text-[13px] font-bold">
                Post-Op Orthopedics
              </span>

              <span className="text-[12px] text-green-700 font-bold">
                88% (On Track)
              </span>

            </div>

            <div className="h-2 bg-blue-100 rounded-full">

              <div className="h-2 w-[88%] bg-green-600 rounded-full"></div>

            </div>

          </button>

          {/* CARDIOLOGY */}

          <button
            onClick={() =>
              alert("Cardiology Readmission Avoidance: 76%")
            }
            className="w-full text-left mb-7"
          >

            <div className="flex justify-between mb-2">

              <span className="text-[13px] font-bold">
                Cardiology Readmission Avoidance
              </span>

              <span className="text-[12px] text-orange-700 font-bold">
                76% (Monitoring)
              </span>

            </div>

            <div className="h-2 bg-blue-100 rounded-full">

              <div className="h-2 w-[76%] bg-orange-400 rounded-full"></div>

            </div>

          </button>

          {/* RESPIRATORY */}

          <button
            onClick={() =>
              alert("Respiratory Rehabilitation: 92%")
            }
            className="w-full text-left"
          >

            <div className="flex justify-between mb-2">

              <span className="text-[13px] font-bold">
                Respiratory Rehabilitation
              </span>

              <span className="text-[12px] text-green-700 font-bold">
                92% (Optimal)
              </span>

            </div>

            <div className="h-2 bg-blue-100 rounded-full">

              <div className="h-2 w-[92%] bg-green-600 rounded-full"></div>

            </div>

          </button>

        </div>

      </div>

    </section>
  );
}

export default Analytics;