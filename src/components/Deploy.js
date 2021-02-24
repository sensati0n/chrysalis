import React, { Component} from "react";
import {hot} from "react-hot-loader";
import ReactJson from 'react-json-view'
import Header from './Header';


import {
  Button,
  FileInput,
  Radio,
  RadioGroup,
  Icon
} from  "@blueprintjs/core";

const EnzianYellow = require("enzian-yallow");

class Deploy extends Component{


    state = {
      selectedFile: "Select a file...",
      enzianModel: undefined,
      network: 'main',
      selectedAbi: 'Select an ABI...'
    }
    
    enzian = new EnzianYellow(window.ethereum);


    handleChange = (event) => {
      this.setState({ network: event.target.value });
};

    readBPMN = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log(text);
      
          let parsedBPMN = await this.enzian.parseBpmnModel(text);

          console.log(parsedBPMN);
          this.setState({ enzianModel: parsedBPMN })


        };
        reader.readAsText(e.target.files[0]);
        this.setState({selectedFile: e.target.files[0].name});

      }

      readABI = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log(text);
        };
        reader.readAsText(e.target.files[0]);
        this.setState({selectedFile: e.target.files[0].name});

      }


      deployModel = async () => {
      let theresult = await this.enzian.deployEnzianModel(this.state.enzianModel);
      console.log(theresult);
    }

    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Deploy</h1>
                  <div style={{display: 'flex'}}>

                      <div  style={{margin: '10px'}}>
                        <h5>Upload a new BPMN-Model</h5>
                        <FileInput  text={this.state.selectedFile} onInputChange={this.readBPMN} />
                      </div>

                      <div >
                        <div style={{margin: '10px'}}>
                          <h5>Parsed Model:</h5>
                          <ReactJson  src={this.state.enzianModel} />
                        </div>
                      </div>

                      <div >
                        <div style={{margin: '10px', maxWidth: '500px'}}>
                          <h5>Deploy Model</h5>

                              <p>Select the Network you want to deploy the contract on.
                                The decision determines, where the decision library was deployed on (address).
                                This address is decisive for the Process Contract-ABI to use.
                                </p>
                              
                        

                          <RadioGroup
                              inline
                              label="Network" 
                              onChange={this.handleChange} 
                              selectedValue={this.state.network}
                          >
                              <Radio label='Ethereum Mainnet' value="main" checked={this.state.network === 'main'} />
                              <Radio label="Ropsten Testnet" value="ropsten" checked={this.state.network === 'ropsten'} />
                              <Radio label="Private Net" value="private" checked={this.state.network === 'private'} />
                          </RadioGroup>

                          <div >
                          { this.state.network === 'private' ?
                             <div>
                              <h4>DEPLOYMENT TO PRIVATE NETWORK</h4>

                              <p>
                                If you are working on a private network, you have to deploy the decision library on your own,
                                precompile the contract and provide the ABI below.
                                </p>
                                <p>
                                Compilation in butterfly is not supportet yet, as solc has a dependency to fs which is not supportet in browser environment.
                              </p>

                              <div  style={{margin: '10px'}}>
                                <h5>Upload the Contract-ABI with the linked Decision Library</h5>
                                <FileInput  text={this.state.selectedAbi} onInputChange={this.readABI} />
                              </div>
                              
                             </div>
                            : ''
                          }
                           
                          </div>

                            <Button
                              intent="primary"
                              rightIcon="send-to-graph"
                              text="Deploy Model to Blockchain"
                              onClick={this.deployModel}
                            />
                        </div>
                      </div>

                  </div>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Deploy);