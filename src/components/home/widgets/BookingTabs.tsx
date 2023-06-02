import React from "react";

export default function AppTabs({
  tabsHeader,
  tabsHeaderCount,
  selectedTab,
  onSelect,
}: {
  selectedTab: number;
  tabsHeader: string[];
  tabsHeaderCount?: number[];
  onSelect: (tab: number) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="mb-0 flex list-none flex-row flex-wrap pb-4"
            role="tablist"
          >
            {tabsHeader.map((tab, index) => (
              <li className="flex-auto text-center" key={tab}>
                <a
                  className={
                    "block rounded px-5 py-3 text-xs font-bold uppercase leading-normal " +
                    (selectedTab === index
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-600")
                  }
                  onClick={() => onSelect(index)}
                  data-toggle="tab"
                  href={"#" + tab}
                  role="tablist"
                >
                  <span className="mr-2">{tab}</span>
                  {tabsHeaderCount && tabsHeaderCount[index] && (
                    <span className="rounded-full bg-gray-600 p-1">
                      {tabsHeaderCount[index]}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
