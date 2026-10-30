interface Props {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

const RadioCard = ({ title, description, selected, onSelect }: Props) => {
  return (
    <label
      className={`relative flex cursor-pointer flex-col items-center gap-1 rounded border px-5 py-5 text-center transition-colors ${
        selected ? 'border-black bg-black/4' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      {/* Native radio input for perfect centering */}
      <input
        type="radio"
        checked={selected}
        onChange={onSelect}
        className="absolute top-2.5 right-2.5 h-3.5 w-3.5 accent-black"
      />

      <span className="text-sm font-semibold">{title}</span>
      <span className="text-xs text-gray-500">{description}</span>
    </label>
  );
};

export default RadioCard;
