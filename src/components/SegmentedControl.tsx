interface Option {
  value: string;
  label: string;
}

export function SegmentedControl({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active
                ? "bg-brand-600 text-white shadow-soft"
                : "border border-line bg-surface text-muted hover:bg-surface-2 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
