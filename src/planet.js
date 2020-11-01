import React, { Component } from "react";
import * as cos from './Three.js'

class PlanetScene extends React.Component{

  componentDidMount(){
    cos.setupScene(this.mount);
    
    // ThreeElements.renderer.render (ThreeElements.scene, ThreeElements.camera);
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