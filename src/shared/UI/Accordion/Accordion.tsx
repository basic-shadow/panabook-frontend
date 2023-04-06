import React, { useState } from "react";

interface IAccordion {
  headers: string[];
  content: React.ReactNode[];
  roomName: string;
}

function FaqComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white">
        <div className="container mx-auto flex flex-col justify-center px-4 py-8 md:p-8">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <p className="mt-4 mb-8 text-gray-600">
            React Interview Questions And Answers
          </p>
          <div className="space-y-4">
            <details className="w-full rounded-lg ring-1 ring-purple-600">
              <summary className="px-4 py-6">What is React?</summary>
              <p className="ml-4 -mt-4 px-4 py-6 pt-0 text-gray-600">
                React is a front-end JavaScript library developed by Facebook in
                2011.
              </p>
            </details>
            <details className="w-full rounded-lg ring-1 ring-purple-600">
              <summary className="px-4 py-6">
                What is Props and how to use it give some example?
              </summary>
              <p className="ml-4 -mt-4 px-4 py-6 pt-0 text-gray-600">
                Props is the shorthand for Properties in React.
              </p>
            </details>
            <details className="w-full rounded-lg ring-1 ring-purple-600">
              <summary className="px-4 py-6">
                How to install tailwind css in react js ?
              </summary>
              <p className="ml-4 -mt-4 px-4 py-6 pt-0 text-gray-600">
                What are synthetic events in React?
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ headers, content, roomName }: IAccordion) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div data-accordion="collapse">
      {headers.map((header, index) => (
        <React.Fragment key={"accordion-" + header + "room" + roomName}>
          <h2
            id={"accordion-collapse-heading-" + (index + 1) + "room" + roomName}
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
            id={"accordion-collapse-body-" + (index + 1) + "room" + roomName}
            className={index !== activeIndex ? "hidden" : "border"}
            aria-labelledby={
              "accordion-collapse-heading-" + (index + 1) + "room" + roomName
            }
          >
            {content[index]}
            {/* <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is an open-source library of interactive components
                built on top of Tailwind CSS including buttons, dropdowns,
                modals, navbars, and more.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to and start developing
                websites even faster with components on top of Tailwind CSS.
              </p>
            </div> */}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
