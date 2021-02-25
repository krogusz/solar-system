import React from "react";
import styled from "styled-components";
import Scrollchor from "react-scrollchor";
import PropTypes from "prop-types";

const NavContainer = styled.ul`
position: fixed;
z-index: 99999;
width:100%;
`;

const EmptyElem = styled.li`
display: inline-block;
width:5%;
`;
const NavItem = styled.button`
width: 10%;
display: inline-block;
background: transparent;
border: none;
outline: none;
`;

const Scroll = styled(Scrollchor)`
color: white;
text-decoration: none;
text-align:justify;
transition: font-size 1s;
`;

class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      enlarge: null
    };
    this.enlarge = this.enlarge.bind(this);
  }

  enlarge(e,element){
    e.preventDefault();
    this.setState({enlarge: element});
  }

  render(){
    
    return(
      <NavContainer>
        <EmptyElem />
        {this.props.planetNames.map(name => (
          <NavItem onClick = {(e)=> this.enlarge(e,name)} key = {name}>
            <Scroll to={`#${name}`}  
              style={{color : this.state.enlarge === name ? "#ffe680" : "white", fontSize : this.state.enlarge === name ? "25px" : "20px"}}>
              {name}
            </Scroll>
          </NavItem>
        ))}
        <EmptyElem />
      </NavContainer>
    );
  }
}

Navigation.propTypes = {
  planetNames: PropTypes.array
};

export default Navigation;
