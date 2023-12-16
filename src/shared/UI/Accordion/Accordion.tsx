import React, { useState } from "react";

interface IAccordion {
  headers: string[];
  content: React.ReactNode[];
  id: string;
}

export default function Accordion({ headers, content, id }: IAccordion) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div data-accordion="collapse">
      {headers.map((header, index) => (
        <React.Fragment key={"accordion-" + header + "room" + id}>
          <h2
            id={"accordion-collapse-heading-" + (index + 1) + "room" + id}
            onClick={() =>
              setActiveIndex((prev) => (prev === index ? -1 : index))
            }
          >
            <button
              type="button"
              className={
                "flex w-full items-center justify-between border border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800" +
                (index === headers.length - 1 && headers.length > 0
                  ? "border-b"
                  : "border-b-0") +
                (index === 0 ? "rounded-t-xl" : "rounded-t-xl")
              }
              data-accordion-target={"#accordion-collapse-body-" + (index + 1)}
              aria-expanded={activeIndex === index}
              aria-controls={"accordion-collapse-body-" + (index + 1)}
            >
              <span>{header}</span>
              <svg
                data-accordion-icon
                className={
                  "h-6 w-6 shrink-0 " +
                  (activeIndex === index ? "rotate-180" : "")
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id={"accordion-collapse-body-" + (index + 1) + "room" + id}
            className={index !== activeIndex ? "hidden" : "border"}
            aria-labelledby={
              "accordion-collapse-heading-" + (index + 1) + "room" + id
            }
          >
            {content[index]}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
