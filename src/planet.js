import React, { Component } from "react";
import * as cos from './Three.js'

class PlanetScene extends React.Component{

  componentDidMount(){
    const {textureURLs, radius, type} = this.props.planetParam;
    cos.setupScene(this.mount, textureURLs, radius, type);
  }
 
  render(){
    return(
      <div
      style={{ width: "800px", height: "800px" }}
      ref={mount => {
        this.mount = mount;
      }}
    />
    )
  }
}

export default PlanetScene;