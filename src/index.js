import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Planet from './planet.js';
import reportWebVitals from './reportWebVitals';
import planets from './planets.json'

ReactDOM.render(
  <React.StrictMode>
    <Planet planetParam = {planets['mercury']}/>
    <Planet planetParam = {planets['earth']}/>
    <Planet planetParam = {planets['venus'] }/>
    <Planet planetParam = {planets['mars'] }/>
    <Planet planetParam = {planets['jupiter'] }/>
    <Planet planetParam = {planets['saturn'] }/>
    <Planet planetParam = {planets['uranus'] }/>
    <Planet planetParam = {planets['neptune'] }/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
