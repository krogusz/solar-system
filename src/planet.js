import React from "react";
import styled from "styled-components";
import PropTypes, { string } from "prop-types";
import {setupScene} from "./Three.js";

const urlAPIbase = "https://api.le-systeme-solaire.net/rest.php/bodies?filter[]=englishName,eq,";

const ContainerDiv = styled.div`
background-color: black;
height: 800px;
`;
const PlanetDivContainer = styled.div`
width: 50%;
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
const InfoDivContainer = styled.div`
position: relative;
width: 50%;
display: inline-block;
height:800px;
`;
const InfoDiv = styled.div`
position: absolute;
top: 50%;
transform: translateY(-50%);
padding-left: 50px;
padding-right: 50px;
`;
const PlanetName = styled.h2`
color: white;
text-align: center;
text-transform: capitalize;
`;
const PlanetInfo = styled.div`
color: white;
line-height: 2;
`;
const AtributteList = styled.ul`
color: white;
line-height: 2;
`;
const ListItem = styled.li``;

class PlanetScene extends React.Component{
  constructor(props){
    super(props);
    this.state = Object.assign(props.planetParam, {infoAPI: {}});
    this.expo = 10;
  }

  componentDidMount(){
    //draw the planets
    setupScene(this.mount, this.state.textureURLs, this.state.radius, this.state.type, this.state.scaling);
    //ask API
    const urlAPI = `${urlAPIbase}${this.state.name}`;
    fetch(urlAPI)
      .then(response => response.json())
      .then(data => {
        this.setState({infoAPI: data.bodies[0]});
      });
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
        <InfoDivContainer>
          <InfoDiv>
            <PlanetName>{this.state.name}</PlanetName>
            <PlanetInfo>
              {this.state.desc}
              {Object.keys(this.state.infoAPI).length == 0 ? (<div></div>):(
                <AtributteList>
                  <ListItem>Mass: {this.state.infoAPI.mass.massValue * Math.pow(10,this.state.infoAPI.mass.massExponent)} </ListItem>
                  <ListItem>Density: {this.state.infoAPI.density}</ListItem>
                  <ListItem>MeanRadius: {this.state.infoAPI.meanRadius}</ListItem>
                  <ListItem>EquaRadius: {this.state.infoAPI.equaRadius} </ListItem>
                  <ListItem>PolarRadius: {this.state.infoAPI.polarRadius}</ListItem>
                </AtributteList>
              )}  
            </PlanetInfo>
          </InfoDiv>
        </InfoDivContainer>
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
