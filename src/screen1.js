import React, { useState } from "react";

import { Saturation, Hue, useColor, Alpha } from "react-color-palette";
import "react-color-palette/css";

import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Grass } from "./components/grass";

const ColorChanger = () => {
  const [skyColor, setSkyColor] = useState("#1e91cb"); // default blue
  const [grassColor, setGrassColor] = useState("#00ff00"); // default green

  const [color, setColor] = useColor("#561ecb");

  const applyChanges = () => {
    // Apply the color changes to your UI
  };

  console.log(color);

  const buildRGBA = () => {
    return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
  };

  return (
    <div className="flex flex-col justify-center p4 my-8 items-start space-y-4">
      <Header />
      <div className="flex flex-col justify-center p4 my-8 items-center space-y-4 mx-8">
        <div className="">
          If you could change the color of the <b>sky</b> and the <b>grass</b>.
          What would it look like?
        </div>
        <div className="">
          <div
            className=""
            style={{
              backgroundColor: buildRGBA(),
              maxWidth: "290px",
              overflow: "hidden",
            }}
          >
            <img src="/sky2.png" />
          </div>
          <div className="" style={{ marginTop: "-25px" }}>
            <Grass color={buildRGBA()} />
          </div>
        </div>
        <p className="text-neutral-500 text-sm">
          Use the slider below to make your selection
        </p>

        <Tabs />

        <div className="flex flex-col w-full space-y-4">
          <Hue color={color} onChange={setColor} />
          <Alpha color={color} onChange={setColor} />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={applyChanges}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default ColorChanger;
