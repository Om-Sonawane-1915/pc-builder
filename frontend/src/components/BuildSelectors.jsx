import ComponentSelector from "./ComponentSelector";

function BuildSelectors({
  cpus,
  gpus,
  motherboards,
  rams,
  storages,
  psus,
  selectedCPU,
  setSelectedCPU,
  selectedGPU,
  setSelectedGPU,
  selectedMotherboard,
  setSelectedMotherboard,
  selectedRAM,
  setSelectedRAM,
  selectedStorage,
  setSelectedStorage,
  selectedPSU,
  setSelectedPSU
}) {
  return (
    <div className="section-card">
      <h2>🖥 Build Your PC</h2>

      <div className="selector-grid">
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
    </div>
  );
}

export default BuildSelectors;