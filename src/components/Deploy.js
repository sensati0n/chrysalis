import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';

import { FileInput } from  "@blueprintjs/core";
const EnzianYellow = require("enzian-yallow");

class Deploy extends Component{

    state = {selectedFile: "Select a file..." };



    componentDidMount() {
        let ethereum = window.ethereum;
        if (ethereum) {
         
          //window.web3 = new Web3(window.ethereum);
          //let result =  window.ethereum.send('eth_requestAccounts').then(r => console.log("r", r));
        }

      
        this.setState({metaMask: "still false"});
        
      }



      showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log(text);


          let enzian = new EnzianYellow(window.ethereum);
      
          let { parsedBPMN, deployedModel } = await enzian.deployBPMNProcess(text);

          console.log(parsedBPMN);


        };
        reader.readAsText(e.target.files[0]);
        console.log(e.target.files[0]);
        this.setState({selectedFile: e.target.files[0].name});

      }

    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Deploy</h1>

                  <FileInput  text={this.state.selectedFile} onInputChange={this.showFile} />

              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Deploy);