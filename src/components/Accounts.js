import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';
const Web3 = require("web3");


import { 
  Button,
  RadioGroup,
  ControlGroup,
  Radio,
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

    selectedStoredAccount: '',
    storedAccounts: []
  };


  connections = [];

  componentDidMount() {

    // GET CONNECTIONS FROM LOCAL STORAGE
    let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
    if(!web3Connections) {
      web3Connections = new Array();
    }

    if (window.ethereum) {
      web3Connections.push("MetaMask");
    }
    
    this.setState({ storedConnections: web3Connections });

    // GET ACCOUNTS FROM LOCAL STORAGE
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    if(!accounts) {
      accounts = new Array();
    }
    this.setState({ storedAccounts: accounts });
    
  }

  setAndUpdateConnection = (value) => {
    this.setState({
      selectedConnection: value.selectedConnection,
      selectedStoredAccount: value.selectedStoredAccount
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
        // localStorage.setItem('privateKey', newAccount.privateKey);
        // localStorage.setItem('address', newAccount.address);

        let accounts = JSON.parse(localStorage.getItem("accounts"));
        if(!accounts) {
          accounts = new Array();
        }
        accounts.push({priv: newAccount.privateKey, addr: newAccount.address});
        localStorage.setItem("accounts", JSON.stringify(accounts));


        break;
    }


  

  }

  importAccount = () => {

  }

  selectedStoredAccountChanged = (event) => {
    this.setState({ selectedStoredAccount: event.target.value });
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
                                <Button
                                  intent="primary"
                                  rightIcon="send-to-graph"
                                  text="Create new Account"
                                  onClick={this.createAccount}
                                /> 
                              }
                              </ControlGroup>

                  <h3>Import an Account</h3>
                  <p>This generates a new Keypair. However, please consider, that the new Account do not have any funds on any network.</p>
                  <ControlGroup>
                          <InputGroup onChange={this.updateInput} id="text-input" placeholder="Paste your private key here..."  intent="primary" style={{width: '800px', fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace'}} />
                              {
                                <Button
                                  intent="primary"
                                  rightIcon="import"
                                  text="Import Account"
                                  onClick={this.importAccount}
                                /> 
                              }
                              </ControlGroup>


                  <h3>Accounts</h3>
                  <RadioGroup
                                label="Available Accounts"
                                onChange={this.selectedStoredAccountChanged}
                                selectedValue={this.state.selectedStoredAccount}
                            >
                                {
                                   this.state.storedAccounts.map(account => {
                                            return (<Radio key={account.addr} value={account.addr} label={account.addr} />)
                                        })
                                }
                            </RadioGroup>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Accounts);