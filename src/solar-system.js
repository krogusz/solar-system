import React from "react";
import styled from "styled-components";
import PropTypes, { string } from "prop-types";
import planets from "./planets.json";
import {setupSystem} from "./Three.js";

const planetsInfo = {};
Object.keys(planets).map(planet => 
{if(planet !== "sun"){
  planetsInfo[planet] = {urls: planets[planet]["textureURLs"], AU: planets[planet]["AU"], radius: planets[planet]["radius"], speedRatio: planets[planet]["speedRatio"] };
}}
);

const planetRadius = {};
Object.keys(planets).map(planet => 
{if(planet !== "sun"){
  planetRadius[planet] = planets[planet]["radius"];
}}
);

const ContainerDiv = styled.div`
// background-color: black;
height: 800px;
`;
const PlanetDivContainer = styled.div`
height: 800px;
display: inline-block;
float: left;
position: relative;
`;
const PlanetDiv = styled.div`
position: absolute;
top:50%;
transform: translateY(-50%);
`;

class PlanetScene extends React.Component{
  constructor(props){
    super(props);
    this.state =props.planetParam ;
    this.expo = 10;
  }

  componentDidMount(){
    //draw the planets
    setupSystem(this.mount, planetsInfo , planets["sun"]["textureURLs"], planets["sun"]["radius"]);
  }
 
  render(){
    return(
      <ContainerDiv>
        <PlanetDivContainer>
          <PlanetDiv
            ref={mount => {
              this.mount = mount;
            }}>
          </PlanetDiv>
        </PlanetDivContainer>
      </ContainerDiv>
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