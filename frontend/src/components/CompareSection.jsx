function CompareSection({
  cpus,
  gpus,

  cpuCompare1,
  setCpuCompare1,
  cpuCompare2,
  setCpuCompare2,

  gpuCompare1,
  setGpuCompare1,
  gpuCompare2,
  setGpuCompare2,

  handleCPUCompare,
  handleGPUCompare,

  comparison
}) {

  return (

    <div className="section-card">

      <h2>📊 Compare Components</h2>

      <h3>CPU Comparison</h3>

      <select
        value={cpuCompare1}
        onChange={(e)=>setCpuCompare1(Number(e.target.value))}
      >
        <option value="">Select CPU</option>

        {cpus.map(cpu=>(
          <option
            key={cpu.id}
            value={cpu.id}
          >
            {cpu.name}
          </option>
        ))}

      </select>

      <select
        value={cpuCompare2}
        onChange={(e)=>setCpuCompare2(Number(e.target.value))}
      >
        <option value="">Select CPU</option>

        {cpus.map(cpu=>(
          <option
            key={cpu.id}
            value={cpu.id}
          >
            {cpu.name}
          </option>
        ))}

      </select>

      <button onClick={handleCPUCompare}>
        Compare CPUs
      </button>

      <hr />

      <h3>GPU Comparison</h3>

      <select
        value={gpuCompare1}
        onChange={(e)=>setGpuCompare1(Number(e.target.value))}
      >
        <option value="">Select GPU</option>

        {gpus.map(gpu=>(
          <option
            key={gpu.id}
            value={gpu.id}
          >
            {gpu.name}
          </option>
        ))}

      </select>

      <select
        value={gpuCompare2}
        onChange={(e)=>setGpuCompare2(Number(e.target.value))}
      >
        <option value="">Select GPU</option>

        {gpus.map(gpu=>(
          <option
            key={gpu.id}
            value={gpu.id}
          >
            {gpu.name}
          </option>
        ))}

      </select>

      <button onClick={handleGPUCompare}>
        Compare GPUs
      </button>

      {comparison && (

        <pre
          style={{
            marginTop:"20px",
            whiteSpace:"pre-wrap"
          }}
        >
          {JSON.stringify(comparison,null,2)}
        </pre>

      )}

    </div>

  );

}

export default CompareSection;