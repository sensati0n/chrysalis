import React, { Component } from "react";
import {hot} from "react-hot-loader";
import ReactJson from 'react-json-view'
import Header from './Header';
import { Select } from "@blueprintjs/select";


import {
  Button,
  FileInput,
  Radio,
  RadioGroup,
  MenuItem,
  ControlGroup
} from  "@blueprintjs/core";

const EnzianYellow = require("enzian-yellow");

class Deploy extends Component{


    state = {
      selectedFile: "Select a file...",
      enzianModel: undefined,
      network: 'main',
      selectedAbi: undefined,
      storedAbiNames: [],
      selectedStoredAbi: 'custom',

      storedConnections: [],
      selectedConnection: "Select Connection...",
      connectionSelected: false
    }
    
    enzian = new EnzianYellow(window.ethereum);

    componentDidMount() {
      let abis = JSON.parse(localStorage.getItem('abis'));
      if(!abis) {
          abis = new Array();
      }
      this.setState({storedAbiNames: abis.map(abi => abi.key)})

      let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
      if(!web3Connections) {
        web3Connections = new Array();
      }
 
      if (window.ethereum) {
        web3Connections.push("MetaMask");
      }
      
      this.setState({ storedConnections: web3Connections });
  

    }

    selectedStoredAbiChanged = (event) => {
      this.setState({ selectedStoredAbi: event.target.value });
  };

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
          console.log(JSON.parse(text));
          this.setState({selectedAbi: JSON.parse(text)})
        };
        reader.readAsText(e.target.files[0]);
        this.setState({selectedFile: e.target.files[0].name});

      }


      deployModel = async () => {
        switch(this.state.network) {
          case 'main':
            console.log("Deploying to Main"); 
          break;
          case 'ropsten':
            console.log("Deploying to Testnet"); 
          break;
          case 'private':
            if(this.state.selectedStoredAbi === 'custom') {
              console.log("Reading network from file"); 
            }
            else {
              let abis = JSON.parse(localStorage.getItem("abis"));
              this.setState({ selectedAbi: abis.filter(abi => abi.key === this.state.selectedStoredAbi)[0] });
            }
          break;
        }

        let theresult = await this.enzian.deployEnzianModelWithAbi(this.state.enzianModel, this.state.selectedAbi);

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

                             
                              
                              <div>
                                <h5>Or use an existing Network Configuration</h5>

                                <RadioGroup
                                  onChange={this.selectedStoredAbiChanged}
                                  selectedValue={this.state.selectedStoredAbi}
                                >
                                    {
                                            this.state.storedAbiNames.map(abiName => {
                                                return (<Radio key={abiName} value={abiName} label={abiName} />)
                                            })
                                    }
                                    <Radio key="custom" value="custom" label="Custom" />
                                </RadioGroup>

                              </div>

                              {
                                this.state.selectedStoredAbi === 'custom' ?
                                  <div     style={{margin: '10px'}}>
                                  <h5>Upload the Contract-ABI with the linked Decision Library</h5>
                                  <FileInput  text='Select an ABI...' onInputChange={this.readABI} />
                                </div>
                                : ''
                              
                              }


                             </div>
                            : ''
                          }
                           
                          </div>
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
                                  text="Deploy Model to Blockchain"
                                  onClick={this.deployModel}
                                /> : <span />
                              }
                              </ControlGroup>
                             
                        </div>
                      </div>

                  </div>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Deploy);