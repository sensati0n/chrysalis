import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';
const Web3 = require("web3");
import { 
  Button,
  Card,
  ControlGroup,
  Elevation,
  Icon,
  InputGroup,
  Tag

} from "@blueprintjs/core";


class Web3Info extends Component{


  state = {
    metaMask: false,
    provider: "",
    connectionUrl: "",
    selectedConnection: "http://127.0.0.1:8545",
    storedConnections: [],

    currentNewUrl: ""
  };


  connections = [];

  componentDidMount() {

    let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
    if(!web3Connections) {
      web3Connections = new Array();
    }

    this.setState({ storedConnections: web3Connections });

    let ethereum = window.ethereum;
    if (window.ethereum) {
      let connected;
      
      connected = ethereum.isConnected();


      window.web3 = new Web3(window.ethereum);
      let result =  window.ethereum.send('eth_requestAccounts').then(r => console.log("r", r));
      console.log(window.web3);
      window.web3.eth.getAccounts().then(accounts => {
        this.setState({metaMask: accounts[0]});
      });


      return;
    }
    else {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));
      this.setState(
        {
          isConnected: "true",
          connectionUrl: this.web3._provider.url
        });
      console.log(this.web3);

      return;
    }
    this.setState({metaMask: "still false"});
    
  }


  updateNewUrl = (event) => {
    this.setState({currentNewUrl : event.target.value});
  }

  deleteConnection = (connection) => {
    let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
    web3Connections = web3Connections.filter(con => con !== connection)
    localStorage.setItem("web3Connections", JSON.stringify(web3Connections));
    this.setState({storedConnections: web3Connections})
  }
  
  addNewConnection = async () => {
    let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
    if(!web3Connections) {
      web3Connections = new Array();
    }
    web3Connections.push(this.state.currentNewUrl);
    localStorage.setItem("web3Connections", JSON.stringify(web3Connections));
    this.setState({ 
      storedConnections: web3Connections,
      currentNewUrl: ""
    })
}


    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Blockchain Connection Management</h1>
                  
                  <div id="metaMask">
                    <h3>Browser-driven Connection with MetaMask</h3>
                      <Card  style={{width: '400px'}}>
                        <h4>MetaMask Connection</h4>
                        <p>MetaMask Browser Extension uses an Infura Node Provider API to connect to a Blockchain Network.</p>
                        <p>{this.state.metaMask}</p>
                        {
                          this.state.metaMask ?
                          <Tag
                            icon="feed"
                            intent="success"
                            large="true"
                            round="true"
                          >
                            Connected
                          </Tag>
                          : 
                          <div>
                            <p>Please visit your Browser AppStore to install the MetaMask Browser Extension.</p>
                            <Tag
                              icon="offline"
                              intent="danger"
                              large="true"
                              round="true"
                            >
                              Not Connected
                            </Tag>
                          </div>
                        }
                      </Card>
                  </div>
                  
                  <div id="customConnections">
                    <h3>Custom Connections</h3>
                      <div  style={{margin: '10px', display: 'flex'}}>
                        {
                          this.state.storedConnections.map(connection => {
                            return (
                              <Card key={connection}  style={{width: '300px'}}>
                                <h2><Icon icon="ip-address" iconSize={32}  /> Connection</h2>
                                
                                <div>URL: <b>{connection}</b></div> <br />
                                <Button
                                  intent="warning"
                                  icon="eraser"
                                  onClick={() => this.deleteConnection(connection)}
                                />
                              </Card>
                            )
                          })
                        }
                        
                        <Card
                          elevation={Elevation.TWO}
                          style={{width: '300px', marginLeft: '20px'}}
                        >
                          <h4>Add new Connection</h4>
                          <ControlGroup vertical={false}>
                            <InputGroup onChange={this.updateNewUrl} id="text-input" placeholder="Connection URL..."  intent="primary" />
                            <Button
                              intent="primary"
                              icon="plus"
                              onClick={this.addNewConnection}
                            />
                          </ControlGroup>
                        </Card>
                      </div>
                    </div>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Web3Info);