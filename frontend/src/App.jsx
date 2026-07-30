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
  buildPC
} from "./services/api";

function App() {
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);

  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  
  const [motherboards, setMotherboards] = useState([]);
  const [rams, setRams] = useState([]);
  const [storages, setStorages] = useState([]);
  const [psus, setPsus] = useState([]);

  const [selectedMotherboard, setSelectedMotherboard] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedPSU, setSelectedPSU] = useState("");
  const [result, setResult] = useState(null);
  const [budget, setBudget] = useState(100000);

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
  }).then((data) => {
    setResult(data);
  });
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
      <button onClick={handleBuild}>
        Build PC
      </button>
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
      <span>CPU</span>
      <span>{result.build.cpu.name}</span>
    </div>

    <div className="summary-item">
      <span>GPU</span>
      <span>{result.build.gpu.name}</span>
    </div>

    <div className="summary-item">
      <span>Motherboard</span>
      <span>{result.build.motherboard.name}</span>
    </div>

    <div className="summary-item">
      <span>RAM</span>
      <span>{result.build.ram.name}</span>
    </div>

    <div className="summary-item">
      <span>Storage</span>
      <span>{result.build.storage.name}</span>
    </div>

    <div className="summary-item">
      <span>PSU</span>
      <span>{result.build.psu.name}</span>
    </div>

    <p className="power">
      Required Power: {result.required_power} W
    </p>

    <p className="total">
      Total Price: ₹{result.total_price}
    </p>

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
  🎮 Gaming Performance
</h3>

<div className="summary-item">
  <span>1080p Ultra</span>
  <span>{result.performance["1080p"]}</span>
</div>

<div className="summary-item">
  <span>1440p High</span>
  <span>{result.performance["1440p"]}</span>
</div>

<div className="summary-item">
  <span>4K Gaming</span>
  <span>{result.performance["4K"]}</span>
</div>
  </div>
)}
    </div>
  );
}

export default App;