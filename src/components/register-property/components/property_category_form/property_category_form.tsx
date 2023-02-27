"use client";
import AppButton from "@/shared/UI/AppButton/AppButton";
import Image from "next/image";
import React from "react";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_CATEGORIES_HEADER_TEXT,
} from "../../utils/const_data";

import { HiArrowRight } from "react-icons/hi";
import { useRegisterPropertyStore } from "../../store/store";

export default function PropertyCategoryForm({
  nextStep,
}: {
  nextStep: () => void;
}) {
  // FORM DATA
  const propertyCategory = useRegisterPropertyStore().property_category;

  const onSelect = (index: number) =>
    useRegisterPropertyStore.setState({ property_category: index });

  return (
    <div className="max-w-7xl bg-white py-6 px-6">
      <h2 className="text-2xl font-bold">{PROPERTY_CATEGORIES_HEADER_TEXT}</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6 rounded-md">
        {PROPERTY_CATEGORIES.map((category, i) => (
          <div
            key={category.label}
            className={
              `flex-grow-1 flex h-60 flex-shrink-0
              basis-1/4
              cursor-pointer
              rounded-md
              border
              shadow-lg ` +
              (propertyCategory === category.value
                ? "border-2 border-blue-500"
                : "border-gray-200")
            }
            onClick={() => onSelect(category.value)}
          >
            <Image
              src={category.img}
              alt={category.label}
              width="200"
              loading="lazy"
              height="120"
              className="h-full w-1/2 rounded-tl-sm rounded-bl-sm object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{category.label}</h3>
              <p className="mt-2 h-5/6 overflow-clip text-ellipsis text-sm text-gray-600">
                {category.description.substring(0, 90) + "..."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* NEXT PAGE */}
      {propertyCategory >= 0 && (
        <div className="mt-8 flex items-center justify-center">
          <AppButton
            text="Продолжить"
            onClick={nextStep}
            prefixIcon={<HiArrowRight />}
          />
        </div>
      )}
    </div>
  );
}
