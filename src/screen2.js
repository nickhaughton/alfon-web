import React, { useState, useEffect } from "react";

import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Grass } from "./components/grass";
import { P5Sketch } from "./dancing";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { PlayButton } from "./play-button";
import { Wrapper } from "./components/wrapper";

const Main = () => {
  const [colors, setColors] = useState();

  const [view, setView] = useState("edit");

  const [task, setTask] = useState("color");
  //   const [task, setTask] = useState("video");

  const [recordingState, setRecordingState] = useState("none");
  const [seconds, setSeconds] = useState(0);

  const [blob, setBlob] = useState();

  useEffect(() => {
    if (recordingState === "recording") {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 50);
      }, 50);

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
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      })
      .then(() => {
        setRecordingState("started");
      });
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
      <div className="flex flex-col justify-center items-center space-y-10 bg-bg-new w-screen h-screen py-40">
        <p className="text-pnpl text-lg font-bold">Sent to ur COMPA ;-)</p>
        <img src="/pnpl.png" />
      </div>
    );
  }

  let description, contents, button;

  if (task === "color") {
    description = (
      <span className=" text-pnpl">
        If you could change the color of the sky and the grass to{" "}
        <span className="font-semibold">how you felt today</span> how would it
        look like?
      </span>
    );
    contents = (
      <div className="">
        <div className="rounded-t-2xl flex flex-col space-y-4  rounded-xl">
          <div
            style={{
              backgroundColor: colors?.skyColor
                ? buildRGBA(colors.skyColor)
                : "#484856",
            }}
            className=" rounded-t-xl"
          >
            <img className="w-full  rounded-t-xl" src="/sky2.png" />
          </div>
          {/* <div
            style={{
              backgroundColor: colors?.grassColor
                ? buildRGBA(colors.grassColor)
                : "#fff",
              marginTop: "-25px",
            }}
          >
            <img className="w-full" src="/grass.png" />
          </div> */}
          <div className="" style={{ marginTop: "-25px" }}>
            <Grass
              color={
                colors?.grassColor ? buildRGBA(colors.grassColor) : "#484856"
              }
            />
          </div>

          <>
            <p className="text-pnpl text-sm">
              Use the slider below to make your selection
            </p>

            <Tabs
              onColorChange={(colors) => {
                setColors(colors);
              }}
              skyColor={colors?.skyColor}
              grassColor={colors?.grassColor}
            />
          </>
        </div>
      </div>
    );
    button = (
      <div className="w-full flex justify-center pb-8">
        <button
          className="bg-pnpl text-white font-bold py-2 px-4 rounded-full text-md"
          onClick={sendButton}
        >
          Apply Changes
        </button>
      </div>
    );
  } else if (task === "video") {
    description = (
      <span className=" text-pnpl">
        Let’s Dance! Tap “Allow Camera” to animate an avatar that captures your
        unique dance moves:
      </span>
    );

    contents = (
      <div className="">
        <div className="rounded-t-2xl flex flex-col space-y-4 overflow-hidden">
          <div className="flex flex-col justify-center items-center relative">
            {(recordingState === "none" || recordingState === "started") && (
              <img src="/reference.png" className=" rounded-xl" />
            )}
            {/* {recordingState === "none" && (
              <div className="absolute">
                <div className="w-24 h-24" onClick={handlePlay}>
                  <PlayButton />
                </div>
              </div>
            )} */}
            {recordingState === "started" && (
              <div className="absolute">
                <CountdownCircleTimer
                  isPlaying
                  duration={5}
                  colors={["rgba(0,0,0,0)"]}
                  onComplete={() => {
                    setRecordingState("recording");
                  }}
                  size={0}
                  width={0}
                >
                  {({ remainingTime }) => (
                    <span className="text-yellow-pnpl text-9xl font-bold">
                      {remainingTime}
                    </span>
                  )}
                </CountdownCircleTimer>
              </div>
            )}
            {recordingState === "recording" && (
              <div className="position-relative">
                <div className="w-content overflow-hidden rounded-xl">
                  <P5Sketch
                    isRecording={recordingState === "recording"}
                    recordingComplete={(blob) => {
                      setBlob(blob);
                    }}
                  />

                  <div className="absolute top-0 left-0 flex space-x-4 overflow-hidden">
                    <div
                      className="h-4 bg-yellow-pnpl"
                      style={{
                        width: `${Math.min(seconds / 20000, 1) * 326}px`,
                      }}
                    ></div>
                  </div>

                  {/* <div
                  className="absolute top-px right-px flex space-x-4"
                  onClick={() => {
                    setRecordingState("stopped");
                  }}
                >
                  <div>
                    <span className="text-white">stop recording</span>
                  </div>
                  <span className="text-white">{formatTime(seconds)}</span>
                </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
    if (recordingState === "none") {
      button = (
        <div className="w-full flex justify-center pb-8">
          <button
            className="bg-pnpl text-white font-bold py-2 px-4 rounded-full text-md"
            onClick={handlePlay}
          >
            Start Scan
          </button>
        </div>
      );
    } else {
      button = (
        <div className="w-full flex pb-8 space-x-2 justify-center">
          <button
            className="bg-pink-pnpl text-white font-bold py-2 px-4 rounded-full text-md"
            onClick={editButton}
          >
            Edit
          </button>
          <button
            className="bg-pnpl text-white font-bold py-2 px-4 rounded-full text-md"
            onClick={() => {
              setRecordingState("stopped");
              sendButton();
            }}
          >
            Apply Changes
          </button>
        </div>
      );
    }
  }

  console.log(contents);

  return (
    <div className="bg-bg-new w-screen h-screen p-4 py-8 flex flex-col space-y-4 pb-18 overflow-y-hidden">
      {/* <div className="w-full flex justify-center">
        <div className="border border-task-btn px-3 rounded-full w-fit h-fit">
          <span className="text-md text-task-btn">Task of the day</span>
        </div>
      </div> */}
      <Wrapper
        step={task === "color" ? 1 : 2}
        description={description}
        contents={contents}
      />
      {button}
    </div>
  );
};

export default Main;
