import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import * as ml5 from "ml5"; // Ensure ml5 is installed and imported

export const P5Sketch = ({ isRecording, recordingComplete }) => {
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
  const [chunks, setChunks] = useState([]);
  const [recorder, setRecorder] = useState();

  function exportVideo(e) {
    var blob = new Blob(chunks, { type: "video/webm" });
    console.log(blob);

    recordingComplete(blob);
  }

  // useEffect(() => {
  //   if (isRecording) {
  //     let stream = document.querySelector("canvas").captureStream(30);
  //     let r = new MediaRecorder(stream);
  //     r.ondataavailable = (e) => {
  //       console.log(e.data.size);

  //       if (e.data.size) {
  //         const newChunks = chunks;
  //         newChunks.push(e.data);
  //         setChunks(newChunks);
  //       }
  //     };
  //     r.start(100);
  //     // r.onstop = exportVideo;
  //     setRecorder(r);
  //   } else if (recorder) {
  //     console.log("here");
  //     recorder.stop();
  //     exportVideo();
  //     // setRecorder(null);
  //   }
  // }, [isRecording]);

  useEffect(() => {
    // Define the sketch using the p5 instance mode
    const sketch = (p) => {
      let video;
      let poseNet;
      let pose;
      let skeleton;

      p.setup = () => {
        p.createCanvas(326, 490);
        p.frameRate(30);
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

        let nose = pose.keypoints.find((part) => part.part === "nose");

        if (nose) {
          bodyParts.nose.previousPos = bodyParts.nose.position;
          bodyParts.nose.position = {
            x: p.lerp(bodyParts.nose.previousPos.x, nose.position.x, 0.9),
            y: p.lerp(bodyParts.nose.previousPos.y, nose.position.y, 0.9),
          };
        }

        let leftWrist = pose.keypoints.find(
          (part) => part.part === "leftWrist"
        );

        if (leftWrist) {
          bodyParts.leftWrist.position = {
            x: leftWrist.position.x,
            y: leftWrist.position.y,
          };
        }

        let leftElbow = pose.keypoints.find(
          (part) => part.part === "leftElbow"
        );

        if (leftElbow) {
          bodyParts.leftElbow.position = {
            x: leftElbow.position.x,
            y: leftElbow.position.y,
          };
        }

        let leftShoulder = pose.keypoints.find(
          (part) => part.part === "leftShoulder"
        );

        if (leftShoulder) {
          bodyParts.leftShoulder.position = {
            x: leftShoulder.position.x,
            y: leftShoulder.position.y,
          };
        }

        let rightWrist = pose.keypoints.find(
          (part) => part.part === "rightWrist"
        );

        if (rightWrist) {
          bodyParts.rightWrist.position = {
            x: rightWrist.position.x,
            y: rightWrist.position.y,
          };
        }

        let rightElbow = pose.keypoints.find(
          (part) => part.part === "rightElbow"
        );

        if (rightElbow) {
          bodyParts.rightElbow.position = {
            x: rightElbow.position.x,
            y: rightElbow.position.y,
          };
        }

        let rightShoulder = pose.keypoints.find(
          (part) => part.part === "rightShoulder"
        );

        if (rightShoulder) {
          bodyParts.rightShoulder.position = {
            x: rightShoulder.position.x,
            y: rightShoulder.position.y,
          };
        }

        ///lower body pt2
        ///right
        let rightHip = pose.keypoints.find((part) => part.part === "rightHip");

        if (rightHip) {
          bodyParts.rightHip.position = {
            x: rightHip.position.x,
            y: rightHip.position.y,
          };
        }

        let rightKnee = pose.keypoints.find(
          (part) => part.part === "rightKnee"
        );

        if (rightKnee) {
          bodyParts.rightKnee.position = {
            x: rightKnee.position.x,
            y: rightKnee.position.y,
          };
        }

        let rightAnkle = pose.keypoints.find(
          (part) => part.part === "rightAnkle"
        );

        if (rightAnkle) {
          bodyParts.rightAnkle.position = {
            x: rightAnkle.position.x,
            y: rightAnkle.position.y,
          };
        }
        ///left
        let leftHip = pose.keypoints.find((part) => part.part === "leftHip");

        if (leftHip) {
          bodyParts.leftHip.position = {
            x: leftHip.position.x,
            y: leftHip.position.y,
          };
        }

        let leftKnee = pose.keypoints.find((part) => part.part === "leftKnee");

        if (leftKnee) {
          bodyParts.leftKnee.position = {
            x: leftKnee.position.x,
            y: leftKnee.position.y,
          };
        }

        let leftAnkle = pose.keypoints.find(
          (part) => part.part === "leftAnkle"
        );

        if (leftAnkle) {
          bodyParts.leftAnkle.position = {
            x: leftAnkle.position.x,
            y: leftAnkle.position.y,
          };
        }

        // Update the body parts state
        setBodyParts(updatedParts);
      };

      p.draw = () => {
        p.translate(video.width, 0); // To mirror the video
        p.scale(-1, 1); // To mirror the video
        p.image(video, 0, 0);
        p.background("#484856");

        if (!pose) return;

        //////

        p.stroke(255);
        p.strokeWeight(2);
        p.noFill();
        // Upper body

        p.beginShape();

        //left arm
        p.curveVertex(
          bodyParts.leftWrist.position.x,
          bodyParts.leftWrist.position.y
        );
        p.curveVertex(
          bodyParts.leftWrist.position.x,
          bodyParts.leftWrist.position.y
        );
        p.curveVertex(
          bodyParts.leftElbow.position.x,
          bodyParts.leftElbow.position.y
        );
        p.curveVertex(
          bodyParts.leftShoulder.position.x,
          bodyParts.leftShoulder.position.y
        );

        ///right arm
        p.curveVertex(
          bodyParts.rightShoulder.position.x,
          bodyParts.rightShoulder.position.y
        );
        p.curveVertex(
          bodyParts.rightElbow.position.x,
          bodyParts.rightElbow.position.y
        );
        p.curveVertex(
          bodyParts.rightWrist.position.x,
          bodyParts.rightWrist.position.y
        );
        p.curveVertex(
          bodyParts.rightWrist.position.x,
          bodyParts.rightWrist.position.y
        );
        p.endShape();
        p.ellipse(bodyParts.nose.position.x, bodyParts.nose.position.y, 100);

        ////// LOWER BODY*****
        ///right hip
        p.beginShape();
        // curveVertex(bodyParts.rightHip.position.x, bodyParts.rightHip.position.y )
        p.curveVertex(
          bodyParts.rightKnee.position.x,
          bodyParts.rightKnee.position.y
        );

        p.curveVertex(
          bodyParts.rightAnkle.position.x,
          bodyParts.rightAnkle.position.y
        );

        p.curveVertex(
          bodyParts.rightHip.position.x,
          bodyParts.rightHip.position.y
        );

        ///Left hip
        p.curveVertex(
          bodyParts.leftHip.position.x,
          bodyParts.leftHip.position.y
        );
        p.curveVertex(
          bodyParts.leftAnkle.position.x,
          bodyParts.leftAnkle.position.y
        );
        p.curveVertex(
          bodyParts.leftKnee.position.x,
          bodyParts.leftKnee.position.y
        );

        // curveVertex(bodyParts.leftHip.position.x, bodyParts.leftHip.position.y )

        p.endShape();
        // if (pose) {
        //   // Draw all keypoints
        //   for (let key in bodyParts) {
        //     const part = bodyParts[key];
        //     p.fill(255);
        //     p.stroke(255);
        //     p.ellipse(part.position.x, part.position.y, 16);
        //   }

        //   // Draw the skeleton
        //   if (skeleton) {
        //     skeleton.forEach((bone) => {
        //       const [a, b] = bone;
        //       p.strokeWeight(2);
        //       p.stroke(255);
        //       p.line(a.position.x, a.position.y, b.position.x, b.position.y);
        //     });
        //   }
        // }
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
