import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import * as ml5 from "ml5"; // Ensure ml5 is installed and imported

const P5Sketch = () => {
  const sketchRef = useRef();
  const [bodyParts, setBodyParts] = useState({
    nose: { position: { x: 0, y: 0 } },
    leftShoulder: { position: { x: 0, y: 0 } },
    leftElbow: { position: { x: 0, y: 0 } },
    leftWrist: { position: { x: 0, y: 0 } },
    rightShoulder: { position: { x: 0, y: 0 } },
    rightElbow: { position: { x: 0, y: 0 } },
    rightWrist: { position: { x: 0, y: 0 } },
    rightHip: { position: { x: 0, y: 0 } },
    rightKnee: { position: { x: 0, y: 0 } },
    rightAnkle: { position: { x: 0, y: 0 } },
    leftHip: { position: { x: 0, y: 0 } },
    leftKnee: { position: { x: 0, y: 0 } },
    leftAnkle: { position: { x: 0, y: 0 } },
  });

  useEffect(() => {
    // Define the sketch using the p5 instance mode
    const sketch = (p) => {
      let video;
      let poseNet;
      let pose;
      let skeleton;

      p.setup = () => {
        p.createCanvas(640, 480);
        video = p.createCapture(p.VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, () => console.log("poseNet ready"));
        poseNet.on("pose", (poses) => {
          if (poses.length > 0) {
            pose = poses[0].pose;
            skeleton = poses[0].skeleton;
            updateBodyParts(poses[0].pose.keypoints);
          }
        });
      };

      const updateBodyParts = (keypoints) => {
        // Create a new object for the body parts
        const updatedParts = {};
        keypoints.forEach((part) => {
          updatedParts[part.part] = {
            position: part.position,
          };
        });
        // Update the body parts state
        setBodyParts(updatedParts);
      };

      p.draw = () => {
        p.background(0);
        p.translate(video.width, 0); // To mirror the video
        p.scale(-1, 1); // To mirror the video
        p.image(video, 0, 0);

        if (pose) {
          // Draw all keypoints
          for (let key in bodyParts) {
            const part = bodyParts[key];
            p.fill(255);
            p.stroke(255);
            p.ellipse(part.position.x, part.position.y, 16);
          }

          // Draw the skeleton
          if (skeleton) {
            skeleton.forEach((bone) => {
              const [a, b] = bone;
              p.strokeWeight(2);
              p.stroke(255);
              p.line(a.position.x, a.position.y, b.position.x, b.position.y);
            });
          }
        }
      };
    };

    // Create the p5 canvas
    let myp5 = new p5(sketch, sketchRef.current);

    // Cleanup function to remove the p5 canvas when the component unmounts
    return () => {
      myp5.remove();
    };
  }, []); // The empty array ensures that the effect runs only once

  return <div ref={sketchRef}></div>;
};

export default P5Sketch;
