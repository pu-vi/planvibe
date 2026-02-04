import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  const baseClasses = "w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF]";
  
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-[#212529] mb-2">
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