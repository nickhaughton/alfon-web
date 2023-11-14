import { useEffect, useState } from "react";

import { Saturation, Hue, useColor, Alpha } from "react-color-palette";
import "react-color-palette/css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Tabs({
  onColorChange,
  skyColor: initialSkyColor,
  grassColor: initialGrassColor,
}) {
  const [skyColor, setSkyColor] = useColor(
    initialSkyColor ? initialSkyColor.hex : "#1e91cb"
  ); // default blue
  const [grassColor, setGrassColor] = useColor(
    initialGrassColor ? initialGrassColor.hex : "#00ff00"
  ); // default green
  const [currentColor, setCurrentColor] = useState("Sky");

  const [tabs, setTabs] = useState([{ name: "Sky" }, { name: "Grass" }]);

  const handleClick = (tab) => {
    setCurrentColor(tab.name);
  };

  const setColor = (color) => {
    if (currentColor === "Sky") {
      setSkyColor(color);
      onColorChange({ grassColor, skyColor: color });
    } else {
      setGrassColor(color);
      onColorChange({ grassColor: color, skyColor });
    }
  };

  const getCurrentColor = () => {
    if (currentColor === "Sky") {
      return skyColor;
    }

    return grassColor;
  };

  useEffect(() => {
    onColorChange({ grassColor, skyColor });
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.name === currentColor
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              onClick={() => {
                handleClick(tab);
              }}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col w-full space-y-4">
        <Hue color={getCurrentColor()} onChange={setColor} />
        <Alpha color={getCurrentColor()} onChange={setColor} />
      </div>
    </div>
  );
}
