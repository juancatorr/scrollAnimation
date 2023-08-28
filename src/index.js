import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "./Sequence";

const backgroundColorsPerAnimation = {
  1: "orange", // default
  2: "blue",
  3: "#150C3C"
};

const App = () => {
  const ref = useRef();
  const [numAnimationActive, setNumAnimationActive] = useState(1);
  console.log("numAnimationActive", numAnimationActive);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "300px",
          backgroundColor: "white"
        }}
      >
        More content
      </div>
      <div
        className="App"
        style={{
          backgroundColor: backgroundColorsPerAnimation[numAnimationActive],
          transition: "background-color 2000ms linear"
        }}
      >
        <Controller globalSceneOptions={{ triggerHook: "onLeave" }}>
          <Scene duration="75%" pin reverse={true}>
            {(progress, event) => {
              //console.log("event 1", event);
              if (
                event.state === "AFTER" &&
                event.scrollDirection === "FORWARD" &&
                event.type === "leave" &&
                numAnimationActive === 1
              ) {
                setNumAnimationActive(2);
              }

              if (
                // event.state === "DURING" &&
                event.scrollDirection === "REVERSE" &&
                event.type === "end" &&
                numAnimationActive === 2
              ) {
                setNumAnimationActive(1);
              }

              return (
                <div style={{ height: "100vh", position: "relative" }}>
                  <Sequence ref={ref} progress={progress} />
                </div>
              );
            }}
          </Scene>
          <Scene duration="75%" pin reverse={true}>
            {(progress, event) => {
              console.log("event 2", event);

              if (
                event.state === "AFTER" &&
                event.type === "leave" &&
                numAnimationActive <= 3
              ) {
                setNumAnimationActive(3);
              }

              if (
                // event.state === "DURING" &&
                event.scrollDirection === "REVERSE" &&
                event.type === "end" &&
                numAnimationActive === 3
              ) {
                setNumAnimationActive(2);
              }

              return (
                <div style={{ height: "100vh", position: "relative" }}>
                  <Sequence ref={ref} progress={progress} />
                </div>
              );
            }}
          </Scene>
          <Scene duration="75%" pin reverse={true}>
            {(progress, event) => {
              //console.log("event 2", event);

              // if (
              //   event.state === "AFTER" &&
              //   event.type === "leave" &&
              //   numAnimationActive <= 3
              // ) {
              //   setNumAnimationActive(3);
              // }

              return (
                <div style={{ height: "100vh", position: "relative" }}>
                  <Sequence ref={ref} progress={progress} />
                </div>
              );
            }}
          </Scene>
        </Controller>
      </div>
      <div
        style={{
          width: "100vw",
          height: "800px",
          backgroundColor: "white"
        }}
      >
        More content
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
