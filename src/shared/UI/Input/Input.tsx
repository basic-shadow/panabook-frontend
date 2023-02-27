import React from "react";
import { type UseFormRegister } from "react-hook-form";

export default function Input({
  label,
  name,
  register,
}: {
  label: string;
  name: string;
  register: UseFormRegister<any>;
}) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
