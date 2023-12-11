import React from "react";
import { useFormContext } from "react-hook-form";
import ReactInputMask from "react-input-mask";

export function PhoneInputMask({ name }: { name: string }) {
  const { register } = useFormContext();

  return (
    <ReactInputMask
      {...register(name)}
      mask="+7(999)999-99-99"
      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
    />
  );
}
