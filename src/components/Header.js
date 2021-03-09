import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';

import {Navbar, Button, MenuItem, Tag, ControlGroup, Alignment} from  "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
const Web3 = require("web3");

class Header extends Component{

  state = {
    storedConnections: [],
    selectedConnection: '',
    connected: false
  }


  componentDidMount() {

    let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
    if(!web3Connections) {
      web3Connections = new Array();
    }

    if (window.ethereum) {
      web3Connections.push("MetaMask");
    }
    
    this.setState({ storedConnections: web3Connections });

    let selectedConnectionFromStorage = localStorage.getItem("selectedConnection");
    this.setState({ selectedConnection: selectedConnectionFromStorage });

    var handler = this.props.setAndUpdateConnection;
    handler(selectedConnectionFromStorage);
    this.tryConnect(selectedConnectionFromStorage)


  }


  
  renderStoredConnections = (storedConnection, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    return (
        <MenuItem
            active={modifiers.active}
            key={storedConnection}
            onClick={handleClick}
            text={storedConnection}
        />
    );
    };

    storedConnectionSelected = async (e) =>  {
      this.setState({
          selectedConnection: e,
          connectionSelected: true
      });

      localStorage.setItem("selectedConnection", e)

      var handler = this.props.setAndUpdateConnection;
      handler(e);
      this.tryConnect(e);
    } 

    tryConnect = async (e) => {
      let testConnection = new Web3(new Web3.providers.HttpProvider(e))

      this.setState({connected: testConnection.currentProvider.connected});

      try {
        let accounts = await testConnection.eth.getAccounts();
      }
      catch(err) {
        console.error(`Cannot connect with selected Provider '${e}'`)
        
        this.setState({connected: false});
        return;

      }
        this.setState({connected: testConnection.currentProvider.connected});
    }


    render(){
      var handler = this.props.setAndUpdateConnection;

      return(
        <Navbar>
        <Navbar.Group >
            <Navbar.Heading>
            <img className="theimage" src='asset/chrysalis.png'/>

              <span> CHRYSALIS </span>
              
              </Navbar.Heading>
            <Navbar.Divider />
            <Link to='/'><Button className="bp3-minimal" icon="home" text="Home" /></Link>
            <Link to='/deployNewProcess'><Button className="bp3-minimal" icon="new-object" text="Deploy Process" /></Link>
            <Link to='/processes'><Button className="bp3-minimal" icon="exchange" text="All Processes" /></Link>
            <Link to='/configure'><Button className="bp3-minimal" icon="cog" text="Configure" /></Link>
            <Link to='/web3'><Button className="bp3-minimal" icon="info-sign" text="Info" /></Link>
            <Link to='/accounts'><Button className="bp3-minimal" icon="user" text="Accounts" /></Link>
            
           
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
              <ControlGroup>
                {
                  this.state.connected ?
                    <Tag icon="feed" intent="success" large="true"  > </Tag> :
                    <Tag icon="offline" intent="danger" large="true"  > </Tag>
                }
                <Select
                  items={this.state.storedConnections}
                  itemRenderer={this.renderStoredConnections}
                  noResults={<MenuItem disabled={true} text="No results." />}
                  onItemSelect={this.storedConnectionSelected}
                >
                  {/* children become the popover target; render value here */}
                  <Button text={this.state.selectedConnection} rightIcon="double-caret-vertical" />
                </Select>
              
              </ControlGroup>
            </Navbar.Group>
    </Navbar>
      );
    }
  }
  
  export default hot(module)(Header);