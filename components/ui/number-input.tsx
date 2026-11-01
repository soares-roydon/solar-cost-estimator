'use client';

import { useState } from 'react';

interface Props {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  className?: string;
}

const NumberInput = ({ label, value, onChange, min, max, step = 1, hint, className }: Props) => {
  const [prevValue, setPrevValue] = useState(value);
  const [displayValue, setDisplayValue] = useState<string>(
    value !== undefined && value !== null ? String(value) : '0'
  );

  // Sync internal string state when external value changes from outside
  if (value !== prevValue) {
    setPrevValue(value);
    setDisplayValue(value !== undefined && value !== null ? String(value) : '0');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Allow user to clear the input completely with backspace
    if (raw === '') {
      setDisplayValue('');
      setPrevValue(min ?? 0);
      onChange(min ?? 0);
      return;
    }

    // Allow typing a negative sign if min allows negative numbers
    if (raw === '-' && (min === undefined || min < 0)) {
      setDisplayValue('-');
      return;
    }

    // Only allow numbers and an optional single decimal point
    if (!/^-?\d*\.?\d*$/.test(raw)) {
      return;
    }

    // Handle leading zero: if user types after a single "0" (e.g. typing "1" on "0" -> "1", not "01")
    let cleaned = raw;
    if (raw.length > 1 && raw.startsWith('0') && raw[1] !== '.') {
      cleaned = raw.replace(/^0+/, '');
      if (cleaned === '') cleaned = '0';
    }

    setDisplayValue(cleaned);

    const parsed = Number(cleaned);
    if (!isNaN(parsed)) {
      setPrevValue(parsed);
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    let finalNum = Number(displayValue);
    if (isNaN(finalNum) || displayValue.trim() === '' || displayValue === '-') {
      finalNum = min ?? 0;
    }
    if (min !== undefined && finalNum < min) {
      finalNum = min;
    }
    if (max !== undefined && finalNum > max) {
      finalNum = max;
    }
    setDisplayValue(String(finalNum));
    setPrevValue(finalNum);
    onChange(finalNum);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const current = Number(displayValue) || 0;
      const next = max !== undefined ? Math.min(max, current + step) : current + step;
      setDisplayValue(String(next));
      setPrevValue(next);
      onChange(next);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const current = Number(displayValue) || 0;
      const next = min !== undefined ? Math.max(min, current - step) : current - step;
      setDisplayValue(String(next));
      setPrevValue(next);
      onChange(next);
    }
  };

  const hasCustomFontSize = className
    ? /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(className)
    : false;
  const baseClasses = `rounded border border-gray-300 bg-white text-gray-900 shadow-2xs transition-colors duration-150 hover:border-gray-400 focus:border-gray-500 focus:outline-none placeholder:text-gray-400 ${
    hasCustomFontSize ? '' : 'text-sm'
  }`;
  const sizeClasses = className ?? 'w-24 px-3 py-1.5';

  const input = (
    <input
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
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
