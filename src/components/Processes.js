import React, { Component} from "react";
import {hot} from "react-hot-loader";

import Header from './Header';

import { MenuItem, Button, NumericInput, ControlGroup } from  "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
const Web3 = require("web3");

const EnzianYellow = require("enzian-yellow");

class Processes extends Component{

  enzian = new EnzianYellow(window.ethereum);


    state = {
      selectedContract: "Select a contract...",
      storedContracts: [],
      storedConnections: [],
      currentEventLog: "No Contract Selected...",
      taskToBeExecuted: -1,
      selectedConnection: "Select Connection...",
      connectionSelected: false
    }


    componentDidMount() {
      let contracts = JSON.parse(localStorage.getItem('contracts'));
      if(!contracts) {
        contracts = new Array();
      }
      this.setState({ storedContracts: contracts });


      let web3Connections = JSON.parse(localStorage.getItem("web3Connections"));
      if(!web3Connections) {
        web3Connections = new Array();
      }
 
      if (window.ethereum) {
        web3Connections.push("MetaMask");
      }
      
      this.setState({ storedConnections: web3Connections });

    }

    handleValueChange = (valueAsNumber, valueAsString) => {
      this.setState({ taskToBeExecuted: valueAsNumber });
    };

    renderContractAddress = (storedContract, { handleClick, modifiers }) => {
      if (!modifiers.matchesPredicate) {
          return null;
      }

      return (
          <MenuItem
              active={modifiers.active}
              key={storedContract}
              onClick={handleClick}
              text={storedContract}
          />
      );
  };



  contractAddressSelected = (e) => {
    this.setState({ selectedContract: e });

    this.enzian.eventlogByAddress(e).then(r => {
      console.log(r);
      this.setState({ currentEventLog: r })
    });

  } 

  storedConnectionSelected = (e) => {
    this.setState({
      selectedConnection: e,
      connectionSelected: true
    });

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


  onExecuteClick = async () => {

    switch(this.state.selectedConnection) {
      case 'MetaMask':
      
        this.enzian = new EnzianYellow(window.ethereum);
        let theresult = await this.enzian.executeTaskByAddress(
          this.state.selectedContract,
          this.state.taskToBeExecuted
        );
        console.log(theresult);
      
      break;
      default:
        this.enzian = new EnzianYellow(new Web3(new Web3.providers.HttpProvider(this.state.selectedConnection)));
        theresult = await this.enzian.executeTaskBySelfSigned(
          this.state.selectedContract,
          this.state.taskToBeExecuted,
          localStorage.getItem('privateKey')
        );
        console.log(theresult);
        break;
    }

  
  }


    render(){
      return(
          <div>
              <Header />
              <div className="content">
                  <h1>Deployed Processes on the current Blockchain</h1>
                  <div style={{display: 'flex'}}>

                      <div  style={{margin: '10px'}}>
                        <h5>Select a deployed Contract</h5>

                        <Select
                            items={this.state.storedContracts}
                            itemRenderer={this.renderContractAddress}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            onItemSelect={this.contractAddressSelected}
                        >
                            {/* children become the popover target; render value here */}
                            <Button text={this.state.selectedContract} rightIcon="double-caret-vertical" />
                        </Select>


                      </div>

                      <div >
                        <div style={{margin: '10px'}}>
                          <h5>Event Log:</h5>
                          {this.state.currentEventLog}
                        </div>
                      </div>

                      <div >
                        <div style={{margin: '10px'}}>
                          <h5>Task List:</h5>
                          <NumericInput onValueChange={this.handleValueChange} />
                          <br />
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
                          <Button
                              intent="primary"
                              text='Execute'
                              rightIcon="flow-linear"
                              onClick={this.onExecuteClick}
                          />
                          </ControlGroup>

                        </div>
                      </div>

                  </div>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Processes);