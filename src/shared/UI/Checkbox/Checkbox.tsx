import React from "react";

export default function Checkbox({
  text,
  checked,
  onChange,
  id,
}: {
  text: string;
  checked: boolean;
  id: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex cursor-pointer items-center">
      <input
        checked={checked}
        id={"checkbox" + text + id}
        type="checkbox"
        value=""
        onChange={onChange}
        className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-indigo-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <label
        htmlFor={"checkbox" + text + id}
        className="ml-2 cursor-pointer text-sm font-medium text-gray-800"
      >
        {text}
      </label>
    </div>
  );
}
