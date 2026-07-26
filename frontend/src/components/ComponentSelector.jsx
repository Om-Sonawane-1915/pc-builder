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

  const current = items.find(
    item => item.id === Number(selected)
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

      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
      >
        <option value="">Select {title}</option>

        {items.map((item) => (
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

