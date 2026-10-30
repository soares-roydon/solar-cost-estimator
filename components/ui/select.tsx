interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

const Select = ({ label, value, onChange, options, className }: Props) => {
  const select = (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded border border-gray-300 px-3 py-1.5 text-sm ${className ?? ''}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );

  if (!label) {
    return select;
  }

  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>
      {select}
    </label>
  );
};

export default Select;
