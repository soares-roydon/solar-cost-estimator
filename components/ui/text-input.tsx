'use client';

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput = ({ label, value, onChange, placeholder, className, disabled }: Props) => {
  const hasCustomPadding =
    className?.includes('px-') ||
    className?.includes('py-') ||
    className?.includes('p-') ||
    className?.includes('pl-') ||
    className?.includes('pr-');
  const hasCustomFontSize = className
    ? /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(className)
    : false;

  const defaultClasses = `rounded border border-gray-300 bg-white text-gray-900 shadow-2xs transition-colors duration-150 hover:border-gray-400 focus:border-gray-500 focus:outline-none placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
    hasCustomPadding ? '' : 'px-3 py-1.5'
  } ${hasCustomFontSize ? '' : 'text-sm'}`;

  const input = (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`${defaultClasses} ${className ?? 'w-full'}`.trim()}
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
