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
    item => item.id === Number(selected)
  );
    
    const filteredItems = items.filter((item) =>
  item[labelKey]
    .toLowerCase()
    .includes(search.toLowerCase())
);
  

  return (
    <div className="component-card">

      <h2>
  {icons[title]} {title}
</h2>

      {current ? (
        <>
          <p className="selected-name">
            {current[labelKey]}
          </p>

          <p className="selected-price">
            ₹{current.price}
          </p>
        </>
      ) : (
        <p className="not-selected">
          Nothing selected
        </p>
      )}

        <input
  type="text"
  placeholder={`Search ${title}`}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px"
  }}
/>

      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
      >
        <option value="">Select {title}</option>

        {filteredItems.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item[labelKey]}
          </option>
        ))}
      </select>

    </div>
  );
}

export default ComponentSelector;

