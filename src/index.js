import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Planet from "./planet.js";
// import Navigation  from "./nav.js";
import reportWebVitals from "./reportWebVitals";
// import planets from "./planets.json";
import App from "./App.js";
// import PropTypes from "prop-types";


// import styled from "styled-components";
// import Scrollchor from 'react-scrollchor';

// const NavContainer = styled.ul`
// `;

// const NavItem = styled.li`
// `;

// class PageSection extends Component {
//   render() {
//     return this.props.content
//   }
// }

// PageSection.propTypes = {
//   content: PropTypes.node.isRequired
// }


ReactDOM.render(
  <React.StrictMode>
    {/* <System planetParam = {planets["sun"]}/> */}

    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
