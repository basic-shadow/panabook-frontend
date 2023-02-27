import React from "react";

interface IRadioValue {
  label: string;
  value: number | boolean;
}

interface IRadioGroup {
  selectedValue: IRadioValue;
  onSelect: (value: number | boolean) => void;
  options: IRadioValue[];
  name?: string;
}

export default function RadioGroup({
  selectedValue,
  onSelect,
  options,
  name,
}: IRadioGroup) {
  return (
    <div className="flex gap-6">
      {options.map((option) => (
        <div
          key={"radio" + option.label}
          className="flex items-center px-4 border rounded border-gray-300 "
          onClick={() => onSelect(option.value)}
        >
          <input
            type="radio"
            id={"radio" + option.label + name}
            name={name}
            onChange={(e) => onSelect(option.value)}
            checked={selectedValue.value == option.value}
            className={
              "w-4 h-4 bg-gray-100 ring-blue-500 ring-offset-gray-800 focus:ring-2 " +
              (option.value == selectedValue.value
                ? "border-blue-500"
                : "border-gray-300")
            }
          />
          <label
            htmlFor={"radio" + option.label + name}
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
