import React, { useState } from "react";

import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Grass } from "./components/grass";

const ColorChanger = () => {
  const [colors, setColors] = useState();

  const [view, setView] = useState("edit");

  const applyChanges = () => {
    setView("review");
  };

  const editButton = () => {
    setView("edit");
  };

  const sendButton = () => {
    setView("sent");

    window.setTimeout(() => {
      setView("task_done");
    }, 4000);
  };

  const backHomeButton = () => {
    setView("edit");
  };

  const buildRGBA = (color) => {
    return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
  };

  if (view === "sent") {
    return (
      <div className="flex flex-col justify-center items-center space-y-10 bg-white py-40">
        <p className="text-pnpl text-lg font-bold">Sent to ur PNPL ;-)</p>
        <img src="/pnpl.png" />
      </div>
    );
  }

  if (view === "task_done") {
    return (
      <div className="flex flex-col justify-center items-center space-y-6 bg-completed py-40 w-screen h-screen">
        <div className="flex flex-col justify-center items-center space-y-4 ">
          <p className="text-phase text-lg font-bold">Phase I</p>
          <p className="text-day text-lg font-bold rounded-full px-4 bg-white">
            Day 2 / 30
          </p>
        </div>
        <span className="text-green-check text-lg font-bold flex space-x-2 items-center">
          <p>Completed</p> <img src="/check.png" className="w-4 h-4" />
        </span>

        <button className="underline text-phase" onClick={backHomeButton}>
          Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center p4 my-8 items-start space-y-4">
      <Header />
      <div className="flex flex-col justify-center p4 my-8 items-center space-y-4 mx-8">
        <div className="">
          If you could change the color of the <b>sky</b> and the <b>grass</b>.
          What would it look like?
        </div>
        <div className="rounded-t-2xl overflow-hidden">
          <div
            className=""
            style={{
              backgroundColor: colors?.skyColor
                ? buildRGBA(colors.skyColor)
                : "#fff",
            }}
          >
            <img src="/sky2.png" />
          </div>
          <div className="" style={{ marginTop: "-25px", width: "287px" }}>
            <Grass
              color={colors?.grassColor ? buildRGBA(colors.grassColor) : "#fff"}
            />
          </div>
        </div>

        {view === "edit" && (
          <>
            <p className="text-neutral-500 text-sm">
              Use the slider below to make your selection
            </p>

            <Tabs
              onColorChange={(colors) => {
                setColors(colors);
              }}
              skyColor={colors?.skyColor}
              grassColor={colors?.grassColor}
            />

            <button
              className="bg-btn-bg hover:bg-btn-outline border-btn-outline border text-btn-text font-bold py-2 px-4 rounded-md text-md"
              onClick={applyChanges}
            >
              Apply Changes
            </button>
          </>
        )}

        {view === "review" && (
          <>
            <span className=" text-md">
              Ready to share it with your{" "}
              <span className="text-bold text-violet-900">Penpal?</span>
            </span>

            <button
              className="bg-btn-bg hover:bg-btn-outline border-btn-outline border text-btn-text font-bold py-2 px-4 rounded-md text-md"
              onClick={editButton}
            >
              Edit
            </button>

            <button
              className="bg-btn-bg hover:bg-btn-outline border-btn-outline border text-btn-text font-bold py-2 px-4 rounded-md text-md"
              onClick={sendButton}
            >
              Send to PNPL
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorChanger;
