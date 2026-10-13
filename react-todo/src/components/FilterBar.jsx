const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Open" },
  { value: "done", label: "Done" },
];

export default function FilterBar({ filter, onChange, doneCount, onClearDone }) {
  return (
    <div className="filters">
      <div className="filter-group" role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter ${filter === f.value ? "is-active" : ""}`}
            onClick={() => onChange(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
      {doneCount > 0 && (
        <button className="clear" onClick={onClearDone}>
          Clear done ({doneCount})
        </button>
      )}
    </div>
  );
}
