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
    connectionSelected: false,
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

  setAndUpdateConnection = (value) => {
    this.setState({
      selectedConnection: value
    })
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



    render(){
      return(
          <div>
              <Header setAndUpdateConnection={this.setAndUpdateConnection} />
              <div className="content">
                <h1>{this.state.handlerValue}</h1>
                  <h1>Account Management</h1>
                  <h3>Create a new Account</h3>
                  <p>This generates a new Keypair. However, please consider, that the new Account do not have any funds on any network.</p>
                  <ControlGroup>
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

                  <h3>Import an Account</h3>
                  <p>This generates a new Keypair. However, please consider, that the new Account do not have any funds on any network.</p>
                  <ControlGroup>
                          <InputGroup onChange={this.updateInput} id="text-input" placeholder="Paste your private key here..."  intent="primary" style={{width: '800px', fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace'}} />
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