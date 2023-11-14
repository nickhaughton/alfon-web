import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Tabs() {
  const [tabs, setTabs] = useState([
    { name: "Sky", current: true },
    { name: "Grass", current: false },
  ]);

  const handleClick = (tab) => {
    const newTabs = JSON.parse(JSON.stringify(tabs));

    if (tab.current) {
      return;
    }

    for (let i = 0; i < newTabs.length; i++) {
      newTabs[i].current = newTabs[i].name === tab.name;
    }

    setTabs([...newTabs]);
  };

  console.log(tabs);
  return (
    <div>
      <div className="sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={tab.current ? "page" : undefined}
              onClick={() => {
                handleClick(tab);
              }}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
