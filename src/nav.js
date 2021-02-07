import React from "react";
import styled from "styled-components";
import Scrollchor from 'react-scrollchor';
import PropTypes from "prop-types";

const NavContainer = styled.ul`
position: fixed;
z-index: 99999;
width:100%;
`;

const EmptyElem = styled.li`
display: inline-block;
width:5%;
`
const NavItem = styled.li`
width: 10%;
display: inline-block;
`;

const Scroll = styled(Scrollchor)`
color: white;
text-decoration: none;
text-align:justify;
`;

class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.planetNames)
    return(
      <NavContainer>
        <EmptyElem />
        {this.props.planetNames.map(name => (
          <NavItem key = {name}>
            <Scroll to={`#${name}`}>{name}</Scroll>
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
