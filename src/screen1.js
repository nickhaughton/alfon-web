import React, { useState, useEffect } from "react";

import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Grass } from "./components/grass";
import { P5Sketch } from "./dancing";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { PlayButton } from "./play-button";

const ColorChanger = () => {
  const [colors, setColors] = useState();

  const [view, setView] = useState("edit");

  const [task, setTask] = useState("color");

  const [recordingState, setRecordingState] = useState("none");
  const [seconds, setSeconds] = useState(0);

  const [blob, setBlob] = useState();

  useEffect(() => {
    if (recordingState === "recording") {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [recordingState]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlay = () => {
    setRecordingState("started");
  };

  const applyChanges = () => {
    setView("review");
  };

  const editButton = () => {
    setView("edit");
    setRecordingState("none");
    setBlob(null);
    setSeconds(0);
  };

  const sendButton = () => {
    setView("sent");

    window.setTimeout(() => {
      if (task === "color") {
        setTask("video");
        setView("edit");
      } else if (task === "video") {
        setView("task_done");
      }
    }, 4000);
  };

  const backHomeButton = () => {
    setTask("color");
    setView("edit");
    setRecordingState("none");
    setBlob(null);
    setSeconds(0);
  };

  const buildRGBA = (color) => {
    return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
  };

  useEffect(() => {
    if (blob) {
      // Draw video to screen
      var videoElement = document.createElement("video");
      videoElement.setAttribute("id", Date.now());
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.loop = true;
      document.querySelector(".blob-container").appendChild(videoElement);
      videoElement.src = window.URL.createObjectURL(blob);
      setView("review");
    }
  }, [blob]);

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
    <div className="flex flex-col justify-center my-4 items-start space-y-4">
      <Header />
      {task === "video" && (
        <>
          <div className="mx-4">
            <b>Let's dance!</b> Stand up and show your moves.
            <br /> You have 2 minutes to complete this task.
          </div>
          <div className="overflow-hidden">
            {!blob && (
              <div className="flex flex-col justify-center items-center relative">
                <P5Sketch
                  isRecording={recordingState === "recording"}
                  recordingComplete={(blob) => {
                    setBlob(blob);
                  }}
                />
                {recordingState === "none" && (
                  <div className="absolute">
                    <div className="w-24 h-24" onClick={handlePlay}>
                      <PlayButton />
                    </div>
                  </div>
                )}
                {recordingState === "started" && (
                  <div className="absolute">
                    <CountdownCircleTimer
                      isPlaying
                      duration={5}
                      colors={["#fff"]}
                      onComplete={() => {
                        setRecordingState("recording");
                      }}
                      size={100}
                      width={2}
                    >
                      {({ remainingTime }) => (
                        <span className="text-white text-4xl font-bold">
                          {remainingTime}
                        </span>
                      )}
                    </CountdownCircleTimer>
                  </div>
                )}
                {recordingState === "recording" && (
                  <div
                    className="absolute top-px right-px flex space-x-4"
                    onClick={() => {
                      setRecordingState("stopped");
                    }}
                  >
                    <div>
                      <span className="text-white">stop recording</span>
                    </div>
                    <span className="text-white">{formatTime(seconds)}</span>
                  </div>
                )}
              </div>
            )}
            {blob && <div className="blob-container"></div>}
          </div>
        </>
      )}
      <div className="flex flex-col justify-center p4 my-8 items-center space-y-4 mx-4">
        {task === "color" && (
          <>
            <div className="">
              If you could change the color of the <b>sky</b> and the{" "}
              <b>grass</b>. What would it look like?
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
                  color={
                    colors?.grassColor ? buildRGBA(colors.grassColor) : "#fff"
                  }
                />
              </div>
            </div>
          </>
        )}

        {view === "edit" && task === "video" && (
          <>
            <p className="text-neutral-500 text-sm">
              Allow access to camera to create an avatar. Your identity is still
              protected from your PNPL.
            </p>

            {recordingState === "stopped" && (
              <button
                className="bg-btn-bg hover:bg-btn-outline border-btn-outline border text-btn-text font-bold py-2 px-4 rounded-md text-md"
                onClick={applyChanges}
              >
                Apply Changes
              </button>
            )}
          </>
        )}

        {view === "edit" && task === "color" && (
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
      </div>

      {view === "review" && (
        <div className="flex flex-col justify-center p4 items-center space-y-4 w-full">
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
        </div>
      )}
    </div>
  );
};

export default ColorChanger;
