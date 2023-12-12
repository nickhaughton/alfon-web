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

  const sendColor = (grassColor, skyColor) => {
    if (grassColor.hex !== "#00ff00" && skyColor.hex !== "#1e91cb") {
      onColorChange({ grassColor, skyColor });
    } else if (grassColor.hex !== "#00ff00") {
      onColorChange({ grassColor });
    } else if (skyColor.hex !== "#1e91cb") {
      onColorChange({ skyColor });
    }
  };

  const setColor = (color) => {
    if (currentColor === "Sky") {
      setSkyColor(color);
      sendColor(grassColor, color);
    } else {
      setGrassColor(color);
      sendColor(color, skyColor);
    }
  };

  const getCurrentColor = () => {
    if (currentColor === "Sky") {
      return skyColor;
    }

    return grassColor;
  };

  // useEffect(() => {
  //   onColorChange({ grassColor, skyColor });
  // }, []);

  console.log(getCurrentColor());

  return (
    <div className="w-full flex flex-col items-center space-y-1  border border-border rounded-md drop-shadow-sm pt-4">
      <div className="">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.name === currentColor
                  ? "bg-pnpl text-white"
                  : "text-pnpl hover:text-pnpl",
                "rounded-md px-2 py-2 text-sm font-medium uppercase"
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

      <div className="bg-white py-4 px-4 w-full flex flex-col  ">
        <div className="flex flex-col w-full space-y-4">
          <Hue color={getCurrentColor()} onChange={setColor} />
          {/* <Alpha color={getCurrentColor()} onChange={setColor} /> */}
        </div>
      </div>
    </div>
  );
}
