import { useState } from "react";

function ComponentSelector({
  title,
  items,
  selected,
  setSelected,
  labelKey = "name"
}) {
  const icons = {
    CPU: "🧠",
    GPU: "🎮",
    Motherboard: "🟩",
    RAM: "⚡",
    Storage: "💾",
    PSU: "🔌"
  };

  const [search, setSearch] = useState("");

  const current = items.find(
    (item) => item.id === Number(selected)
  );

  const filteredItems = items.filter((item) =>
    String(item[labelKey] || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleChange(e) {
    const value = e.target.value;

    if (value === "") {
      setSelected("");
    } else {
      setSelected(Number(value));
    }
  }

  return (
    <div className="component-card">

      {/* Component Header */}
      <div className="component-header">

        <h3 className="component-title">
          {icons[title] || "🧩"} {title}
        </h3>

        {current && (
          <span className="selected-badge">
            Selected
          </span>
        )}

      </div>

      {/* Selected Component */}
      {current ? (
        <div className="selected-component">

          <p className="selected-name">
            {current[labelKey]}
          </p>

          <p className="selected-price">
            ₹{Number(current.price || 0).toLocaleString("en-IN")}
          </p>

          <div className="component-stats">

            {"gaming_score" in current && (
              <div className="stat">
                <span>🎮 Gaming</span>
                <strong>
                  {current.gaming_score}/100
                </strong>
              </div>
            )}

            {"productivity_score" in current && (
              <div className="stat">
                <span>💻 Productivity</span>
                <strong>
                  {current.productivity_score}/100
                </strong>
              </div>
            )}

            {"performance_score" in current && (
              <div className="stat">
                <span>🚀 Performance</span>
                <strong>
                  {current.performance_score}/100
                </strong>
              </div>
            )}

            {"ray_tracing_score" in current && (
              <div className="stat">
                <span>✨ Ray Tracing</span>
                <strong>
                  {current.ray_tracing_score}/100
                </strong>
              </div>
            )}

            {"memory" in current && (
              <div className="stat">
                <span>🧠 VRAM</span>
                <strong>
                  {current.memory} GB
                </strong>
              </div>
            )}

            {"capacity" in current && (
              <div className="stat">
                <span>💾 Capacity</span>
                <strong>
                  {current.capacity} GB
                </strong>
              </div>
            )}

            {"wattage" in current && (
              <div className="stat">
                <span>⚡ Wattage</span>
                <strong>
                  {current.wattage}W
                </strong>
              </div>
            )}

            {"cores" in current && (
              <div className="stat">
                <span>⚙️ Cores</span>
                <strong>
                  {current.cores}
                </strong>
              </div>
            )}

            {"threads" in current && (
              <div className="stat">
                <span>🧵 Threads</span>
                <strong>
                  {current.threads}
                </strong>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="not-selected">
          <span>📦</span>
          <p>Nothing selected</p>
        </div>
      )}

      {/* Search */}
      <div className="component-search">

        <input
          type="text"
          placeholder={`🔍 Search ${title}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Dropdown */}
      <select
        value={selected}
        onChange={handleChange}
        className="component-select"
      >

        <option value="">
          Select {title}
        </option>

        {filteredItems.map((item) => (
          <option
            key={`${title}-${item.id}`}
            value={item.id}
          >
            {item[labelKey]} - ₹
            {Number(item.price || 0).toLocaleString("en-IN")}
          </option>
        ))}

      </select>

      {/* No Search Results */}
      {filteredItems.length === 0 && (
        <p className="no-results">
          No {title} found.
        </p>
      )}

    </div>
  );
}

export default ComponentSelector;