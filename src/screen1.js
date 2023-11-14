import React, { useState } from "react";

import { Saturation, Hue, useColor, Alpha } from "react-color-palette";
import "react-color-palette/css";

import { Header } from "./components/header";

const ColorChanger = () => {
  const [skyColor, setSkyColor] = useState("#0000ff"); // default blue
  const [grassColor, setGrassColor] = useState("#00ff00"); // default green

  const [color, setColor] = useColor("#561ecb");

  const applyChanges = () => {
    // Apply the color changes to your UI
  };

  return (
    <div className="flex flex-col justify-center p4 my-8 mx-8 items-start space-y-4">
      <Header />
      <div className="">
        If you could change the color of the sky and the grass. How would it
        look like?
      </div>
      {/* Illustration goes here */}
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
  );
};

export default ColorChanger;
