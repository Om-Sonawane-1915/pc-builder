
import { useEffect, useState } from "react";
import ComponentSelector from "./components/ComponentSelector";
import "./App.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BuildSelectors from "./components/BuildSelectors";
import CompareSection from "./components/CompareSection";
import {
  getCPUs,
  getGPUs,
  getMotherboards,
  getRAMs,
  getStorages,
  getPSUs,
  buildPC,
  generateBuild,
  compareCPUs,
  compareGPUs,
  saveBuild,
  getSavedBuilds,
  deleteSavedBuild
} from "./services/api";

function App() {
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [motherboards, setMotherboards] = useState([]);
  const [rams, setRams] = useState([]);
  const [storages, setStorages] = useState([]);
  const [psus, setPsus] = useState([]);

  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [selectedMotherboard, setSelectedMotherboard] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedPSU, setSelectedPSU] = useState("");

  const [result, setResult] = useState(null);
  const [budget, setBudget] = useState(100000);
  const [purpose, setPurpose] = useState("Gaming");

  const [cpuCompare1, setCpuCompare1] = useState("");
  const [cpuCompare2, setCpuCompare2] = useState("");

  const [gpuCompare1, setGpuCompare1] = useState("");
  const [gpuCompare2, setGpuCompare2] = useState("");

  const [comparison, setComparison] = useState(null);

  const [savedBuilds, setSavedBuilds] = useState([]);

  useEffect(() => {
    getCPUs().then(setCpus);
    getGPUs().then(setGpus);
    getMotherboards().then(setMotherboards);
    getRAMs().then(setRams);
    getStorages().then(setStorages);
    getPSUs().then(setPsus);
    getSavedBuilds().then(setSavedBuilds);
  }, []);

  function handleBuild() {
  if (
    !selectedCPU ||
    !selectedGPU ||
    !selectedMotherboard ||
    !selectedRAM ||
    !selectedStorage ||
    !selectedPSU
  ) {
    alert("Please select all components before building your PC.");
    return;
  }

  buildPC({
    cpu_id: Number(selectedCPU),
    gpu_id: Number(selectedGPU),
    motherboard_id: Number(selectedMotherboard),
    ram_id: Number(selectedRAM),
    storage_id: Number(selectedStorage),
    psu_id: Number(selectedPSU),
    purpose: purpose
  })
    .then((data) => {
      setResult(data);
    })
    .catch((error) => {
      console.error("Build failed:", error);
      alert("Failed to build PC. Please check your selections.");
    });
}

  function handleCPUCompare() {
    if (!cpuCompare1 || !cpuCompare2) return;

    compareCPUs(cpuCompare1, cpuCompare2)
      .then(setComparison);
  }

  function handleGPUCompare() {
    if (!gpuCompare1 || !gpuCompare2) return;

    compareGPUs(gpuCompare1, gpuCompare2)
      .then(setComparison);
  }

  async function handleAutoBuild() {
  const data = await generateBuild(
    budget,
    purpose
  );

  setSelectedCPU(data.build.cpu.id);
  setSelectedGPU(data.build.gpu.id);
  setSelectedMotherboard(data.build.motherboard.id);
  setSelectedRAM(data.build.ram.id);
  setSelectedStorage(data.build.storage.id);
  setSelectedPSU(data.build.psu.id);

  const buildResult = await buildPC({
    cpu_id: data.build.cpu.id,
    gpu_id: data.build.gpu.id,
    motherboard_id: data.build.motherboard.id,
    ram_id: data.build.ram.id,
    storage_id: data.build.storage.id,
    psu_id: data.build.psu.id,
    purpose: purpose
  });

  setResult(buildResult);
}

  async function handleSaveBuild() {

  if (!result) {
    alert("Build a PC first.");
    return;
  }

  const buildData = {
    id: Date.now(),

    cpu: result.build.cpu.name,
    gpu: result.build.gpu.name,
    motherboard: result.build.motherboard.name,
    ram: result.build.ram.name,
    storage: result.build.storage.name,
    psu: result.build.psu.name,

    cpu_id: Number(selectedCPU),
    gpu_id: Number(selectedGPU),
    motherboard_id: Number(selectedMotherboard),
    ram_id: Number(selectedRAM),
    storage_id: Number(selectedStorage),
    psu_id: Number(selectedPSU),

    total_price: Number(result.total_price),
    purpose: purpose
  };

  console.log(JSON.stringify(buildData, null, 2));

  await saveBuild(buildData);

  const builds = await getSavedBuilds();
  setSavedBuilds(builds);

  alert("✅ Build Saved!");
}

  async function handleLoadBuild(build) {

    setSelectedCPU(build.cpu_id);
    setSelectedGPU(build.gpu_id);
    setSelectedMotherboard(build.motherboard_id);
    setSelectedRAM(build.ram_id);
    setSelectedStorage(build.storage_id);
    setSelectedPSU(build.psu_id);

    setPurpose(build.purpose);

    const data = await buildPC({
      cpu_id: build.cpu_id,
      gpu_id: build.gpu_id,
      motherboard_id: build.motherboard_id,
      ram_id: build.ram_id,
      storage_id: build.storage_id,
      psu_id: build.psu_id,
      purpose: build.purpose
    });

    setResult(data);

  }

  async function handleDeleteBuild(buildId) {
  try {
    await deleteSavedBuild(buildId);

    const builds = await getSavedBuilds();
    setSavedBuilds(builds);

    alert("🗑 Build deleted!");
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete build.");
  }
}

      function exportPDF() {

      if (!result) {
        alert("Please build a PC first.");
        return;
      }

      const doc = new jsPDF();

          doc.setFontSize(22);
      doc.text("PC Builder Report", 20, 20);

      doc.setFontSize(12);

      doc.text(`Budget: Rs. ${budget}`, 20, 35);
      doc.text(`Purpose: ${purpose}`, 20, 43);
      doc.text(`Total Price: Rs. ${result.total_price}`, 20, 51);

      autoTable(doc, {
        startY: 60,
        head: [["Component", "Selected"]],
        body: [
          ["CPU", result.build.cpu.name],
          ["GPU", result.build.gpu.name],
          ["Motherboard", result.build.motherboard.name],
          ["RAM", `${result.build.ram.capacity} GB ${result.build.ram.type}`],
          ["Storage", result.build.storage.name],
          ["PSU", `${result.build.psu.wattage}W ${result.build.psu.name}`]
        ]
      });
      
      const finalY = doc.lastAutoTable.finalY + 15;

      doc.setFontSize(16);
      doc.text("Build Analysis", 20, finalY);

      doc.setFontSize(12);

      doc.text(
        `Compatibility: ${
          result.compatible ? "Compatible" : "Issues Found"
        }`,
        20,
        finalY + 12
      );

      doc.text(
        `Power Required: ${result.required_power}W`,
        20,
        finalY + 20
      );

      const cleanTier = result.overall_score.tier.replace(/[^\x00-\x7F]/g, "");

      doc.text(
        `Build Tier: ${cleanTier}`,
        20,
        finalY + 28
      );

      doc.text(
        `Overall Score: ${result.overall_score.score}/100`,
        20,
        finalY + 36
      );

      const cleanRating = result.overall_score.rating.replace(/[^\x00-\x7F]/g, "");

      doc.text(
        `Rating: ${cleanRating}`,
        20,
        finalY + 44
      );

      doc.save("PC_Build_Report.pdf");

  }
  return (
    <div className="container">
      <h1 className="title">🖥️ PC Builder</h1>

      <p className="subtitle">
        Build your perfect PC with compatible components.
      </p>

      <div className="budget-card">
        <h2>💰 Your Budget</h2>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Enter Budget"
        />
      </div>

      <div className="budget-card">

  <h2>🎯 Build Purpose</h2>

  <select
    value={purpose}
    onChange={(e) => setPurpose(e.target.value)}
  >
    <option>Gaming</option>
    <option>Programming</option>
    <option>Streaming</option>
    <option>Video Editing</option>
    <option>Office</option>
  </select>

</div>

      <div className="grid">

        <BuildSelectors
  cpus={cpus}
  gpus={gpus}
  motherboards={motherboards}
  rams={rams}
  storages={storages}
  psus={psus}

  selectedCPU={selectedCPU}
  setSelectedCPU={setSelectedCPU}

  selectedGPU={selectedGPU}
  setSelectedGPU={setSelectedGPU}

  selectedMotherboard={selectedMotherboard}
  setSelectedMotherboard={setSelectedMotherboard}

  selectedRAM={selectedRAM}
  setSelectedRAM={setSelectedRAM}

  selectedStorage={selectedStorage}
  setSelectedStorage={setSelectedStorage}

  selectedPSU={selectedPSU}
  setSelectedPSU={setSelectedPSU}
/>

      </div>

      <hr />

      <h3>Selected Components</h3>

      <p>CPU ID: {selectedCPU || "None"}</p>
      <p>GPU ID: {selectedGPU || "None"}</p>
      <p>Motherboard ID: {selectedMotherboard || "None"}</p>
      <p>RAM ID: {selectedRAM || "None"}</p>
      <p>Storage ID: {selectedStorage || "None"}</p>
      <p>PSU ID: {selectedPSU || "None"}</p>

      <div
  style={{
    display: "flex",
    gap: "12px",
    marginTop: "20px"
  }}
>
  <button onClick={handleBuild}>
    🔨 Build PC
  </button>

  <button
    onClick={handleSaveBuild}
    style={{ marginLeft: "10px" }}
  >
    💾 Save Build
  </button>

  <button
  onClick={exportPDF}
  style={{ marginTop: "10px" }}
>
  📄 Export Build Report
</button>

  <button onClick={handleAutoBuild}>
    ✨ Auto Generate Build
  </button>
</div>

            <hr />

    <h2 style={{ marginTop: "40px" }}>
      ⚔️ Component Comparison
    </h2>

    <div className="budget-card">

      <h3>🧠 Compare CPUs</h3>

      <select
        value={cpuCompare1}
        onChange={(e) => setCpuCompare1(Number(e.target.value))}
      >
        <option value="">Select CPU 1</option>

        {cpus.map(cpu => (
          <option key={cpu.id} value={cpu.id}>
            {cpu.name}
          </option>
        ))}
      </select>

      <select
        value={cpuCompare2}
        onChange={(e) => setCpuCompare2(Number(e.target.value))}
      >
        <option value="">Select CPU 2</option>

        {cpus.map(cpu => (
          <option key={cpu.id} value={cpu.id}>
            {cpu.name}
          </option>
        ))}
      </select>

      <button
        style={{ marginTop: "12px" }}
        onClick={handleCPUCompare}
      >
        Compare CPUs
      </button>

    </div>

    <div className="budget-card" style={{ marginTop: "25px" }}>

      <h3>🎮 Compare GPUs</h3>

      <select
        value={gpuCompare1}
        onChange={(e) => setGpuCompare1(Number(e.target.value))}
      >
        <option value="">Select GPU 1</option>

        {gpus.map(gpu => (
          <option key={gpu.id} value={gpu.id}>
            {gpu.name}
          </option>
        ))}
      </select>

      <select
        value={gpuCompare2}
        onChange={(e) => setGpuCompare2(Number(e.target.value))}
      >
        <option value="">Select GPU 2</option>

        {gpus.map(gpu => (
          <option key={gpu.id} value={gpu.id}>
            {gpu.name}
          </option>
        ))}
      </select>

      <button
        style={{ marginTop: "12px" }}
        onClick={handleGPUCompare}
      >
        Compare GPUs
      </button>

    </div>

    {comparison && (

      <div
        className="summary-card"
        style={{ marginTop: "30px" }}
      >

        <h2>🏆 Comparison Result</h2>

        <div className="summary-item">
          <span>Name</span>
          <span>{comparison.component1.name}</span>
          <span>{comparison.component2.name}</span>
        </div>

        {"gaming_score" in comparison.component1 && (

          <>
            <div className="summary-item">
              <span>Gaming Score</span>
              <span>{comparison.component1.gaming_score}</span>
              <span>{comparison.component2.gaming_score}</span>
            </div>

            <div className="summary-item">
              <span>Productivity</span>
              <span>{comparison.component1.productivity_score}</span>
              <span>{comparison.component2.productivity_score}</span>
            </div>

            <div className="summary-item">
              <span>Cores</span>
              <span>{comparison.component1.cores}</span>
              <span>{comparison.component2.cores}</span>
            </div>

            <div className="summary-item">
              <span>Threads</span>
              <span>{comparison.component1.threads}</span>
              <span>{comparison.component2.threads}</span>
            </div>
          </>

        )}

        {"performance_score" in comparison.component1 && (

          <>
            <div className="summary-item">
              <span>Performance</span>
              <span>{comparison.component1.performance_score}</span>
              <span>{comparison.component2.performance_score}</span>
            </div>

            <div className="summary-item">
              <span>VRAM</span>
              <span>{comparison.component1.memory} GB</span>
              <span>{comparison.component2.memory} GB</span>
            </div>

            <div className="summary-item">
              <span>Ray Tracing</span>
              <span>{comparison.component1.ray_tracing_score}</span>
              <span>{comparison.component2.ray_tracing_score}</span>
            </div>
          </>

        )}

        <div className="summary-item">
          <span>Price</span>
          <span>₹{comparison.component1.price}</span>
          <span>₹{comparison.component2.price}</span>
        </div>

        <h2
          style={{
            color: "#22c55e",
            marginTop: "20px",
            textAlign: "center"
          }}
        >
          🥇 Winner: {comparison.winner}
        </h2>

      </div>

    )}

    {result && (
  <div className="analysis-section">

    {/* ANALYSIS HEADER */}

    <div className="analysis-header">
      <div>
        <h2>📊 Build Analysis</h2>
        <p>Your complete PC performance and compatibility report.</p>
      </div>

      <div className="score-badge">
        <span>Overall Score</span>
        <strong>{result.overall_score?.score ?? 0}/100</strong>
      </div>
    </div>


    {/* BUILD STATUS */}

    <div className="analysis-grid">

      <div className="analysis-card compatibility-card">
        <span className="analysis-icon">🔧</span>

        <div>
          <h3>Compatibility</h3>

          <strong
            className={
              result.compatible
                ? "status-good"
                : "status-bad"
            }
          >
            {result.compatible
              ? "Compatible"
              : "Issues Found"}
          </strong>
        </div>
      </div>


      <div className="analysis-card">
        <span className="analysis-icon">⚡</span>

        <div>
          <h3>Power Required</h3>

          <strong>
            {result.required_power}W
          </strong>
        </div>
      </div>


      <div className="analysis-card">
        <span className="analysis-icon">💰</span>

        <div>
          <h3>Total Price</h3>

          <strong>
            ₹{Number(result.total_price).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>


      <div className="analysis-card">
        <span className="analysis-icon">🏆</span>

        <div>
          <h3>Build Tier</h3>

          <strong>
            {result.overall_score.tier}
          </strong>
        </div>
      </div>

    </div>


    {/* SELECTED COMPONENTS */}

    <div className="analysis-panel">

      <h3>🧩 Selected Components</h3>

      <div className="component-summary-grid">

        <div className="component-summary">
          <span>🧠 CPU</span>

          <strong>
            {result.build.cpu.name}
          </strong>

          <small>
            {result.build.cpu.cores} Cores •{" "}
            {result.build.cpu.threads} Threads
          </small>

          <small>
            Gaming Score:{" "}
            {result.build.cpu.gaming_score}/100
          </small>
        </div>


        <div className="component-summary">
          <span>🎮 GPU</span>

          <strong>
            {result.build.gpu.name}
          </strong>

          <small>
            VRAM: {result.build.gpu.memory} GB
          </small>

          <small>
            Performance:{" "}
            {result.build.gpu.performance_score}/100
          </small>
        </div>


        <div className="component-summary">
          <span>🟩 Motherboard</span>

          <strong>
            {result.build.motherboard.name}
          </strong>

          <small>
            Socket: {result.build.motherboard.socket}
          </small>

          <small>
            RAM: {result.build.motherboard.ram_type}
          </small>
        </div>


        <div className="component-summary">
          <span>⚡ RAM</span>

          <strong>
            {result.build.ram.name}
          </strong>

          <small>
            {result.build.ram.capacity} GB
          </small>

          <small>
            {result.build.ram.speed} MHz
          </small>
        </div>


        <div className="component-summary">
          <span>💾 Storage</span>

          <strong>
            {result.build.storage.name}
          </strong>

          <small>
            {result.build.storage.capacity} GB
          </small>

          <small>
            {result.build.storage.type}
          </small>
        </div>


        <div className="component-summary">
          <span>🔌 PSU</span>

          <strong>
            {result.build.psu.name}
          </strong>

          <small>
            {result.build.psu.wattage}W
          </small>
        </div>

      </div>

    </div>


    {/* BUDGET */}

    <div className="analysis-panel">

      <h3>💰 Budget Status</h3>

      {result.total_price <= budget ? (

        <div className="budget-status success">

          <strong>🟢 Under Budget</strong>

          <span>
            ₹{(budget - result.total_price).toLocaleString("en-IN")} remaining
          </span>

        </div>

      ) : (

        <div className="budget-status danger">

          <strong>🔴 Over Budget</strong>

          <span>
            ₹{(result.total_price - budget).toLocaleString("en-IN")} over budget
          </span>

        </div>

      )}

    </div>


    {/* GAME PERFORMANCE */}

    <div className="analysis-panel">

      <h3>🎮 Game Performance</h3>

      <div className="game-grid">

        {Object.entries(result.game_fps).map(
          ([game, fps]) => {

            let rating = "";
            let ratingClass = "";

            if (fps >= 120) {
              rating = "🔥 Ultra Smooth";
              ratingClass = "fps-excellent";
            } else if (fps >= 90) {
              rating = "🟢 Excellent";
              ratingClass = "fps-good";
            } else if (fps >= 60) {
              rating = "🟡 Very Good";
              ratingClass = "fps-average";
            } else if (fps >= 40) {
              rating = "🟠 Playable";
              ratingClass = "fps-playable";
            } else {
              rating = "🔴 Low FPS";
              ratingClass = "fps-low";
            }

            return (
              <div
                className="game-card"
                key={game}
              >
                <strong>{game}</strong>

                <span className="fps-number">
                  {fps} FPS
                </span>

                <span className={ratingClass}>
                  {rating}
                </span>
              </div>
            );

          }
        )}

      </div>

    </div>


    {/* RESOLUTION PERFORMANCE */}

    <div className="analysis-panel">

      <h3>🖥 Estimated Gaming Performance</h3>

      <div className="resolution-grid">

        <div className="resolution-card">
          <span>1080p</span>

          <strong>
            {result.estimated_fps["1080p"]} FPS
          </strong>
        </div>


        <div className="resolution-card">
          <span>1440p</span>

          <strong>
            {result.estimated_fps["1440p"]} FPS
          </strong>
        </div>


        <div className="resolution-card">
          <span>4K</span>

          <strong>
            {result.estimated_fps["4k"]} FPS
          </strong>
        </div>

      </div>

    </div>


    {/* OVERALL SCORE */}

    <div className="analysis-panel score-panel">

      <h3>🏆 Overall Build Rating</h3>

      <div className="big-score">
        {result.overall_score?.score ?? 0}

        <span>/100</span>
      </div>

      <div className="tier-text">
        {result.overall_score.tier}
      </div>

      <div className="rating-text">
        {result.overall_score.rating}
      </div>

    </div>


    {/* BOTTLENECK */}

    <div className="analysis-panel">

      <h3>🧩 Bottleneck Analysis</h3>

      <div className="bottleneck-box">

        <div>
          <span>Bottleneck Difference</span>

          <strong>
            {result.bottleneck.percentage}%
          </strong>
        </div>


        <div>
          <span>Status</span>

          <strong>
            {result.bottleneck.status}
          </strong>
        </div>

      </div>

    </div>


    {/* RECOMMENDATIONS */}

    <div className="analysis-panel">

      <h3>💡 Smart Recommendations</h3>

      <div className="recommendation-list">

        {result.recommendations.map(
          (item, index) => (

            <div
              className="recommendation"
              key={index}
            >
              {item}
            </div>

          )
        )}

      </div>

    </div>

  </div>
)}
    
    <h2 style={{ marginTop: "40px" }}>
  💾 Saved Builds
</h2>

{savedBuilds.length === 0 ? (
  <p>No saved builds.</p>
) : (
  savedBuilds.map((build) => (
          <div
        key={build.id}
        className="saved-build-card"
      >
    
      <h3>{build.cpu}</h3>

      <p><strong>GPU:</strong> {build.gpu}</p>

      <p><strong>Motherboard:</strong> {build.motherboard}</p>

      <p><strong>RAM:</strong> {build.ram}</p>

      <p><strong>Storage:</strong> {build.storage}</p>

      <p><strong>PSU:</strong> {build.psu}</p>

      <p>
        <strong>Price:</strong> Rs. {build.total_price}
      </p>

      <p>
        <strong>Purpose:</strong> {build.purpose}
      </p>

      <button
        onClick={() => handleLoadBuild(build)}
        style={{
          marginTop: "10px",
          marginRight: "10px",
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        📂 Load
      </button>

      <button
        onClick={() => handleDeleteBuild(build.id)}
        style={{
          marginTop: "10px",
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        🗑 Delete
      </button>

    </div>
  ))
)}

    </div>
  );
}

export default App;