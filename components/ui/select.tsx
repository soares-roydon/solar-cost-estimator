'use client';

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
  disabled?: boolean;
}

const Select = ({ label, value, onChange, options, className, disabled }: Props) => {
  const hasCustomPadding =
    className?.includes('px-') ||
    className?.includes('py-') ||
    className?.includes('p-') ||
    className?.includes('pl-') ||
    className?.includes('pr-');
  const hasCustomFontSize = className
    ? /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(className)
    : false;

  const defaultClasses = `appearance-none rounded border border-gray-300 bg-white text-gray-900 shadow-2xs transition-colors duration-150 hover:border-gray-400 focus:border-gray-500 focus:outline-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
    hasCustomPadding ? '' : 'pl-3 pr-8 py-1.5'
  } ${hasCustomFontSize ? '' : 'text-sm'}`;

  const isFullWidth = !className || className.includes('w-full');

  const select = (
    <div className={`relative ${isFullWidth ? 'w-full' : 'inline-flex'}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${defaultClasses} ${className ?? 'w-full'}`.trim()}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400">
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
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
