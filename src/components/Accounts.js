import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';
const Web3 = require("web3");


import { 
  Button,
  MenuItem,
  ControlGroup,
  Elevation,
  Icon,
  InputGroup,
  Tag

} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";


class Accounts extends Component {


  state = {
    storedConnections: [],
    selectedConnection: '',
    connectionSelected: false
  };


  connections = [];

  componentDidMount() {

    let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
    if(!web3Connections) {
      web3Connections = new Array();
    }

    if (window.ethereum) {
      web3Connections.push("MetaMask");
    }
    
    this.setState({ storedConnections: web3Connections });
    
  }

  createAccount = async () => {


    console.log("New contract with ", this.state.selectedConnection)


    switch(this.state.selectedConnection) {
      case 'MetaMask': break;
      default:
        let web3Instance = new Web3(new Web3.providers.HttpProvider(this.state.selectedConnection));
        let newAccount = await web3Instance.eth.accounts.create();
        console.log('newAccount', newAccount);
        localStorage.setItem('privateKey', newAccount.privateKey);
        localStorage.setItem('address', newAccount.address);
        break;
    }


    let contracts = JSON.parse(localStorage.getItem("contracts"));
    if(!contracts) {
      contracts = new Array();
    }
    contracts.push(theresult._address);
    localStorage.setItem("contracts", JSON.stringify(contracts));

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

    storedConnectionSelected = (e) => {
    this.setState({
        selectedConnection: e,
        connectionSelected: true
    });

    } 



    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Account Management</h1>
                  <ControlGroup>
                              <Select
                                items={this.state.storedConnections}
                                itemRenderer={this.renderStoredConnections}
                                noResults={<MenuItem disabled={true} text="No results." />}
                                onItemSelect={this.storedConnectionSelected}
                              >
                                {/* children become the popover target; render value here */}
                                <Button text={this.state.selectedConnection} rightIcon="double-caret-vertical" />
                              </Select>
                              {
                                this.state.connectionSelected ?
                                <Button
                                  intent="primary"
                                  rightIcon="send-to-graph"
                                  text="Create new Account"
                                  onClick={this.createAccount}
                                /> : <span />
                              }
                              </ControlGroup>
                 
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Accounts);