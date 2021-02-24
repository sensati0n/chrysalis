import React, { Component} from "react";
import {hot} from "react-hot-loader";

import Header from './Header';

import { TextArea, Button } from  "@blueprintjs/core";

const EnzianYellow = require("enzian-yallow");

class Processes extends Component{


    state = {
      contractAddresses: ""
    }
    
    // enzian = new EnzianYellow(window.ethereum);

    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Deployed Processes on the current Blockchain</h1>
                  <div style={{display: 'flex'}}>

                      <div  style={{margin: '10px'}}>
                        <h5>Upload a new BPMN-Model</h5>
                      </div>

                      <div >
                        <div style={{margin: '10px'}}>
                          <h5>Parsed Model:</h5>
                        </div>
                      </div>

                      <div >
                        <div style={{margin: '10px'}}>
                          <h5>Deploy Model</h5>
                        
                        </div>
                      </div>

                  </div>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Processes);