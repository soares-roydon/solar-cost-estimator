interface Props {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  hint?: string;
  className?: string;
}

const NumberInput = ({ label, value, onChange, min, max, hint, className }: Props) => {
  const defaultClasses = 'rounded border border-gray-300 text-sm';
  const sizeClasses = className ?? 'w-24 px-3 py-1.5';

  const input = (
    <input
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`${defaultClasses} ${sizeClasses}`}
    />
  );

  if (!label && !hint) {
    return input;
  }

  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-xs text-gray-500">{label}</span>}
      {input}
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </label>
  );
};

export default NumberInput;
