interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TextInput = ({ label, value, onChange, placeholder, className }: Props) => {
  const input = (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded border border-gray-300 px-3 py-1.5 text-sm ${className ?? ''}`}
    />
  );

  if (!label) {
    return input;
  }

  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>
      {input}
    </label>
  );
};

export default TextInput;
