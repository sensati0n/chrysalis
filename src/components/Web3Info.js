import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';
const Web3 = require("web3");


class Web3Info extends Component{

  state = {
    isConnected: "false"
  
  };
  

  componentDidMount() {

    localStorage.setItem('a contract', 'name');


    let ethereum = window.ethereum;
    if (window.ethereum) {
      let connected;
      
      connected = ethereum.isConnected();

      this.setState({isConnected: "true"});

      window.web3 = new Web3(window.ethereum);
      let result =  window.ethereum.send('eth_requestAccounts').then(r => console.log("r", r));
    }
    this.setState({metaMask: "still false"});
    
  }


    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Web 3 Info</h1>
                  <h3>Provider Information:</h3>
                  <div>Connected: {this.state.isConnected} </div>

              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Web3Info);