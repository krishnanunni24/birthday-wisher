import React from "react";

const Input = ({ type,name, register,rules , placeholder}) => {
  return (
    <div>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder || name}
        {...register(name,rules)
        }
        className="mt-2 w-full rounded-full border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-400"
      />
    </div>
  );
};

export default Input;
