import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import React from "react";

export default function RegisterPropertyButtons({
  onGoBack,
  onNextStep,
  cancelText = "Назад",
  submitText = "Продолжить",
  isLoading = false,
}: {
  onGoBack: () => void;
  onNextStep?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | (() => void);
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="mt-4 flex items-center justify-between bg-white px-6 py-6">
      <button
        className="inline-flex items-center gap-x-1 rounded-lg px-6 py-2
          text-sm text-gray-800 shadow outline-none hover:bg-gray-100"
        onClick={onGoBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {cancelText}
      </button>
      <button
        className=" rounded-lg bg-indigo-500 px-6 py-2 text-sm text-white outline-none
          ring-indigo-300 hover:bg-indigo-600"
        onClick={onNextStep}
      >
        {isLoading ? <SpinnerLoader /> : submitText}
      </button>
    </div>
  );
}
