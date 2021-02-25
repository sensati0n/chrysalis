import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';


import {Navbar, Button} from  "@blueprintjs/core";

class Header extends Component{
    render(){
      return(
        <Navbar>
        <Navbar.Group >
            <Navbar.Heading>BUTTERfly</Navbar.Heading>
            <Navbar.Divider />
            <Link to='/'><Button className="bp3-minimal" icon="home" text="Home" /></Link>
            <Link to='/deployNewProcess'><Button className="bp3-minimal" icon="new-object" text="Deploy Process" /></Link>
            <Link to='/processes'><Button className="bp3-minimal" icon="exchange" text="All Processes" /></Link>
            <Link to='/configure'><Button className="bp3-minimal" icon="cog" text="Configure" /></Link>
            <Link to='/web3'><Button className="bp3-minimal" icon="info-sign" text="Info" /></Link>
        </Navbar.Group>
    </Navbar>
      );
    }
  }
  
  export default hot(module)(Header);