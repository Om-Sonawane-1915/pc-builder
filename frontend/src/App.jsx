import { useEffect, useState } from "react";
import ComponentSelector from "./components/ComponentSelector";
import "./styles/App.css";
import {
  getCPUs,
  getGPUs,
  getMotherboards,
  getRAMs,
  getStorages,
  getPSUs,
  buildPC,
  generateBuild

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

  useEffect(() => {
    getCPUs().then(setCpus);
    getGPUs().then(setGpus);
    getMotherboards().then(setMotherboards);
    getRAMs().then(setRams);
    getStorages().then(setStorages);
    getPSUs().then(setPsus);
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

  <button onClick={handleAutoBuild}>
    ✨ Auto Generate Build
  </button>
</div>

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
            🎮 Estimated Gaming Performance
          </h3>

          <div className="summary-item">
            <span>1080p Ultra</span>
            <span>{result.estimated_fps["1080p"]} FPS</span>
          </div>

          <div className="summary-item">
            <span>1440p High</span>
            <span>{result.estimated_fps["1440p"]} FPS</span>
          </div>

          <div className="summary-item">
            <span>4K Ultra</span>
            <span>{result.estimated_fps["4k"]} FPS</span>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;