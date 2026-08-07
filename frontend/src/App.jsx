import { useEffect, useState } from "react";
import ComponentSelector from "./components/ComponentSelector";
import "./styles/App.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
  buildPC({
    cpu_id: selectedCPU,
    gpu_id: selectedGPU,
    motherboard_id: selectedMotherboard,
    ram_id: selectedRAM,
    storage_id: selectedStorage,
    psu_id: selectedPSU,
    purpose: purpose
  }).then((data) => {
    setResult(data);
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

    cpu_id: selectedCPU,
    gpu_id: selectedGPU,
    motherboard_id: selectedMotherboard,
    ram_id: selectedRAM,
    storage_id: selectedStorage,
    psu_id: selectedPSU,

    total_price: result.total_price,
    purpose: purpose
  };

  console.log("BUILD DATA:");
  console.log(buildData);

  const response = await saveBuild(buildData);

  console.log("SERVER RESPONSE:");
  console.log(response);

  alert("✅ Build Saved!");

  const builds = await getSavedBuilds();
  setSavedBuilds(builds);

}


  setSelectedCPU(data.build.cpu.id);
  setSelectedGPU(data.build.gpu.id);
  setSelectedMotherboard(data.build.motherboard.id);
  setSelectedRAM(data.build.ram.id);
  setSelectedStorage(data.build.storage.id);
  setSelectedPSU(data.build.psu.id);

  const result = await buildPC({
    cpu_id: data.build.cpu.id,
    gpu_id: data.build.gpu.id,
    motherboard_id: data.build.motherboard.id,
    ram_id: data.build.ram.id,
    storage_id: data.build.storage.id,
    psu_id: data.build.psu.id,
    purpose: purpose
  });

  setResult(result);
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

        <ComponentSelector
          title="CPU"
          items={cpus}
          selected={selectedCPU}
          setSelected={setSelectedCPU}
        />

        <ComponentSelector
          title="GPU"
          items={gpus}
          selected={selectedGPU}
          setSelected={setSelectedGPU}
        />

        <ComponentSelector
          title="Motherboard"
          items={motherboards}
          selected={selectedMotherboard}
          setSelected={setSelectedMotherboard}
        />

        <ComponentSelector
          title="RAM"
          items={rams}
          selected={selectedRAM}
          setSelected={setSelectedRAM}
        />

        <ComponentSelector
          title="Storage"
          items={storages}
          selected={selectedStorage}
          setSelected={setSelectedStorage}
        />

        <ComponentSelector
          title="PSU"
          items={psus}
          selected={selectedPSU}
          setSelected={setSelectedPSU}
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
        <div className="summary-card">

          <h2>🖥️ Build Summary</h2>

          <p className="compatible">
            {result.compatible ? "✅ Compatible" : "❌ Not Compatible"}
          </p>

          {result.warnings.length > 0 ? (
            <div>

              <h3>Warnings</h3>

              {result.warnings.map((warning, index) => (
                <p
                  key={index}
                  style={{ color: "#ef4444" }}
                >
                  ❌ {warning}
                </p>
              ))}

            </div>
          ) : (

            <div>

              <h3>System Checks</h3>

              <p>✅ CPU socket matches motherboard</p>
              <p>✅ RAM type is supported</p>
              <p>✅ PSU wattage is sufficient</p>

            </div>

          )}

          <div className="summary-item">
  <span>🧠 CPU</span>

  <span>
    <strong>{result.build.cpu.name}</strong>
    <br />
    {result.build.cpu.cores} Cores • {result.build.cpu.threads} Threads
    <br />
    Socket: {result.build.cpu.socket}
    <br />
    Power: {result.build.cpu.power}W
    <br />
    Gaming Score: {result.build.cpu.gaming_score}/100
  </span>
</div>

<div className="summary-item">
  <span>🎮 GPU</span>

  <span>
    <strong>{result.build.gpu.name}</strong>
    <br />
    VRAM: {result.build.gpu.memory} GB
    <br />
    Power: {result.build.gpu.power}W
    <br />
    Performance Score: {result.build.gpu.performance_score}/100
  </span>
</div>

<div className="summary-item">
  <span>🟩 Motherboard</span>

  <span>
    <strong>{result.build.motherboard.name}</strong>
    <br />
    Socket: {result.build.motherboard.socket}
    <br />
    RAM Type: {result.build.motherboard.ram_type}
  </span>
</div>

<div className="summary-item">
  <span>⚡ RAM</span>

  <span>
    <strong>{result.build.ram.name}</strong>
    <br />
    {result.build.ram.capacity} GB
    <br />
    {result.build.ram.speed} MHz
    <br />
    {result.build.ram.type}
  </span>
</div>

<div className="summary-item">
  <span>💾 Storage</span>

  <span>
    <strong>{result.build.storage.name}</strong>
    <br />
    Capacity: {result.build.storage.capacity} GB
    <br />
    Type: {result.build.storage.type}
  </span>
</div>

<div className="summary-item">
  <span>🔌 PSU</span>

  <span>
    <strong>{result.build.psu.name}</strong>
    <br />
    Wattage: {result.build.psu.wattage}W
  </span>
</div>

          <p className="power">
            Required Power: {result.required_power} W
          </p>

          <p className="total">
            Total Price: ₹{result.total_price}
          </p>

          <h3 style={{ marginTop: "25px" }}>
          💡 Smart Recommendations
        </h3>

        {result.recommendations.map((item, index) => (
          <p
            key={index}
            style={{
              margin: "8px 0",
              lineHeight: "1.6"
            }}
          >
            {item}
          </p>
        ))}

          {result.total_price <= budget ? (
            <div className="budget-success">
              🟢 Under Budget
              <br />
              Remaining: ₹{budget - result.total_price}
            </div>
          ) : (
            <div className="budget-danger">
              🔴 Over Budget
              <br />
              Exceeded by: ₹{result.total_price - budget}
            </div>
          )}

          <h3 style={{ marginTop: "30px" }}>
            🎮 Game Performance
            </h3>

          {Object.entries(result.game_fps).map(([game, fps]) => {
            let rating = "";

          if (fps >= 120) {
            rating = "🔥 Ultra Smooth";
          } else if (fps >= 90) {
            rating = "🟢 Excellent";
          } else if (fps >= 60) {
            rating = "🟡 Very Good";
          } else if (fps >= 40) {
            rating = "🟠 Playable";
          } else {
            rating = "🔴 Low FPS";
          }

            return (
              <div className="summary-item" key={game}>
                <span>{game}</span>
                <span>
                  {fps} FPS &nbsp; {rating}
                </span>
              </div>
            );
          })}

            <h3 style={{ marginTop: "30px" }}>
            🏆 Overall Build
          </h3>

          <div className="summary-item">
            <span>Score</span>
            <span>{result.overall_score.score}/100</span>
          </div>

          <div className="summary-item">
            <span>Tier</span>
            <span>{result.overall_score.tier}</span>
          </div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "10px",
              color: "#22c55e"
            }}
          >
            {result.overall_score.rating}
          </div>

          <h3 style={{ marginTop: "30px" }}>
            🧩 Bottleneck Analysis
          </h3>

          <div className="summary-item">
            <span>Bottleneck</span>
            <span>{result.bottleneck.percentage}%</span>
          </div>

          <div className="summary-item">
            <span>Status</span>
            <span>{result.bottleneck.status}</span>
          </div>

        <div
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "18px"
          }}
          >
          {result.bottleneck.status}
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
      style={{
        border: "1px solid #444",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        background: "#1f1f1f"
      }}
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