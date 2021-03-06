import React from "react";
import styled from "styled-components";
import PropTypes, { string } from "prop-types";
import {setupPlanet} from "./Three.js";

const PlanetDivContainer = styled.div`
background-color: black;
width: 100%;
height: 952px;
display: inline-block;
float: left;
position: relative;
`;
const PlanetDiv = styled.div`
width:100%;
position: absolute;
top:50%;
transform: translateY(-50%);
`;

class PlanetScene extends React.Component{
  constructor(props){
    super(props);
    this.state = Object.assign(props.planetParam, {infoAPI: {}});
    this.expo = 10;
  }

  componentDidMount(){
    setupPlanet(this.mount, this.state.textureURLs, this.state.ring);
  }
 
  render(){
    return(
      <PlanetDivContainer>
        <PlanetDiv
          ref={mount => {
            this.mount = mount;
          }}>
        </PlanetDiv>
      </PlanetDivContainer>
    );
  }
}

PlanetScene.propTypes = {
  planetParam: PropTypes.shape({
    textureURLs: PropTypes.shape({
      planet: string,
      bump: string
    }),
    radius: string,
    type: string,
    name: string,
    desc: string
  })
};

export default PlanetScene;
