import clsx from "clsx";
import React from "react";
import { useFormContext } from "react-hook-form";
import AppDropdown, { type MenuItemValue } from "../AppDropdown/AppDropdown";

export default function FormDropdown({
  id,
  name,
  label,
  className,
  options,
  required,
  onSelect,
  selectedValue,
}: {
  id: string;
  label?: string;
  name: string;
  options: MenuItemValue[];
  selectedValue: MenuItemValue;
  onSelect: (id: number | string) => void;
  className?: string;
  required?: boolean;
}) {
  const { getFieldState } = useFormContext();
  const { error } = getFieldState(name);

  return (
    <div className={clsx("mb-4 flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="w-fit text-sm font-semibold text-gray-700"
        >
          {label}
          {/* REQUIRED */}
          {required && <span className="ml-1 text-red-700">*</span>} :
          {error?.message && (
            <span className="ml-2 text-sm font-medium text-red-800">
              {error.message}
            </span>
          )}
        </label>
      )}
      <AppDropdown
        name={name}
        selectedValue={selectedValue}
        options={options}
        onSelect={onSelect}
      />
    </div>
  );
}
