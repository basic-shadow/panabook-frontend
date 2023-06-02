import clsxm from "@/shared/utils/clsxm";
import clsx from "clsx";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function NewInput({
  id,
  type,
  name,
  label,
  placeholder,
  value,
  className,
  required,
  disabled,
}: {
  id: string | number;
  label?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { register, getFieldState } = useFormContext();
  const { error, invalid } = getFieldState(name);
  const inputProps = disabled ? {} : register(name);

  return (
    <div className={clsx("mb-4 flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="w-fit text-sm font-semibold text-gray-700"
        >
          {label}
          {/* REQUIRED */}
          {required && <span className="ml-1 text-red-700">*</span>}
          {error?.message && (
            <span className="ml-2 text-sm font-medium text-red-800">
              {error.message}
            </span>
          )}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        className={clsxm(
          "w-full rounded border border-gray-200 px-4 py-1",
          invalid && "border-red-800"
        )}
        disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}
