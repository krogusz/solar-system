import React from "react";
import Planet from "./planet.js";
import Navigation  from "./nav.js";
import planets from "./planets.json";
import styled from "styled-components";

const planetsNames = Object.keys(planets);

const Container = styled.div`
position: relative;
`;
const PlanetSection = styled.div`
height: 952px;
`;

class App extends React.Component{

  render(){
    return(
      <Container>
        <Navigation planetNames = {planetsNames}/>
        {planetsNames.map(name => (
          <PlanetSection key = {name} id = {name}><Planet  planetParam = {planets[name]} scaling = {false}/></PlanetSection>
        ))}
      </Container>
    );
  }
}

export default App;
