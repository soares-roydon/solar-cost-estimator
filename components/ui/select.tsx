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
  const hasCustomPadding =
    className?.includes('px-') || className?.includes('py-') || className?.includes('p-');
  const hasCustomFontSize = className?.includes('text-');
  const defaultClasses = `rounded border border-gray-300 ${hasCustomPadding ? '' : 'px-3 py-1.5'} ${hasCustomFontSize ? '' : 'text-sm'}`;

  const select = (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${defaultClasses} ${className ?? ''}`.trim()}
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
