import React, { useState } from 'react';

const FloatingLabelInput = ({ type, label, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <label
  className={`absolute transition-all duration-200 ease-in-out transform pl-10 
    ${focused || value ? 'text-pink-600 text-xs -translate-y-5' : 'text-gray-500 text-base translate-y-2.5'}
  `}
>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full p-3 pl-10 text-center border rounded-md 
          ${focused || value ? 'border-pink-600' : 'border-gray-300'} 
          focus:outline-none  focus:border-pink-500`}
      />
    </div>
  );
};

export default FloatingLabelInput;
