import React, { useEffect, useState } from "react";

export type MenuItemValue = {
  label: string | number;
  value: number | string;
  disabled?: boolean;
};

interface IAppDropdown<T> {
  id?: string;
  selectedValue: MenuItemValue;
  onSelect: (id: number | string) => void;
  options: MenuItemValue[];
  name?: string;
  active?: boolean;
}

export default function AppDropdown<T>({
  id,
  onSelect,
  options,
  selectedValue,
  name,
  active = false,
}: IAppDropdown<T>) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.addEventListener("click", handleClose, true);
    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }, []);

  return (
    <div className="relative inline-block w-fit text-left">
      <div>
        <button
          aria-labelledby={id}
          type="button"
          className={
            "inline-flex w-fit justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 " +
            (active
              ? "bg-indigo-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50")
          }
          id="menu-button"
          aria-expanded={open}
          aria-haspopup={open}
          onClick={() => setOpen(!open)}
          name={name}
        >
          <>
            {selectedValue?.label || "Не выбрано"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </>
        </button>
      </div>
      {/* use popupPosition to set popup position */}
      <div
        className={`top-1/1 absolute left-0 z-10 mt-2 max-h-[260px] w-52 origin-top-right divide-y divide-gray-100 overflow-y-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        hidden={!open}
      >
        <div className="py-1" role="none">
          {options.map((option, i) => (
            <div
              key={"menu-item" + option?.label + i}
              className={
                "block cursor-pointer px-4 py-2 text-sm text-gray-700 " +
                (option.disabled
                  ? "text-gray-200"
                  : "hover:bg-indigo-500 hover:text-white")
              }
              role="menuitem"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                if (option.disabled) return;
                onSelect(option.value);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
