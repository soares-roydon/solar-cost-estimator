interface Props {
  name?: string;
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}

const RadioCard = ({ name, title, description, selected, onSelect }: Props) => {
  return (
    <label
      className={`relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded border px-4 py-3 text-center transition-colors ${
        selected ? 'border-black bg-black/4' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={onSelect}
        className="absolute top-2.5 right-2.5 h-3.5 w-3.5 accent-black"
      />

      <span className="text-sm font-semibold text-gray-900">{title}</span>
      {description && <span className="text-xs text-gray-500">{description}</span>}
    </label>
  );
};

export default RadioCard;
