import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Planet from "./planet.js";
// import System from "./solar-system.js";
import reportWebVitals from "./reportWebVitals";
import planets from "./planets.json";

ReactDOM.render(
  <React.StrictMode>
    {/* <System planetParam = {planets["sun"]}/> */}
    <Planet planetParam = {planets["mercury"]} scaling = {false}/>
    <Planet planetParam = {planets["venus"] } scaling = {false} />
    <Planet planetParam = {planets["earth"]} scaling = {false} />
    <Planet planetParam = {planets["mars"] } scaling = {false} />
    <Planet planetParam = {planets["jupiter"] } scaling = {false} />
    <Planet planetParam = {planets["saturn"] } scaling = {false} />
    <Planet planetParam = {planets["uranus"] } scaling = {false} />
    <Planet planetParam = {planets["neptune"] } scaling = {false}/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
