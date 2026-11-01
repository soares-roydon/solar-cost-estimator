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
  const hasCustomFontSize = className
    ? /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(className)
    : false;
  const baseClasses = `rounded border border-gray-300 ${hasCustomFontSize ? '' : 'text-sm'}`;
  const sizeClasses = className ?? 'w-24 px-3 py-1.5';

  const input = (
    <input
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`${baseClasses} ${sizeClasses}`}
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
