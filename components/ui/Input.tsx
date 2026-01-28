import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  const baseClasses = "w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${className}`}
        {...props}
      />
    </div>
  );
}