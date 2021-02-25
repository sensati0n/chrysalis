import React, { Component} from "react";
import {hot} from "react-hot-loader";

import Header from './Header';

import { MenuItem, Button, NumericInput } from  "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const EnzianYellow = require("enzian-yellow");

class Processes extends Component{

  enzian = new EnzianYellow(window.ethereum);


    state = {
      selectedContract: "Select a contract...",
      storedContracts: [],
      currentEventLog: "No Contract Selected...",
      taskToBeExecuted: -1
    }


    componentDidMount() {
      this.setState({ storedContracts: [
        '0x33A54Fd1B675750128FD5Cd00e8DC0280cCD33E6',
        '0x22821e3AB454B2271A3AdC363c9E1b5aef6FC1Db',
        '0x8fB9cEee0A589a81a692d1E590CE492f94401e36',
        '0xf0E5e88Fac548cE0f2EA690548A4f9e61c0F012f',
        '0xdA0eA61287bD3ED0048C284f0C46c3C49f70b0A4'
      ]});
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

  onExecuteClick = async () => {
    let theresult = await this.enzian.executeTaskByAddress(
      this.state.selectedContract,
      this.state.taskToBeExecuted
    );
    console.log(theresult);
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
                          <Button
                              intent="primary"
                              text='Execute'
                              rightIcon="flow-linear"
                              onClick={this.onExecuteClick}
                          />

                        </div>
                      </div>

                  </div>
              </div>
          </div>
      );
    }
  }
  
  export default hot(module)(Processes);