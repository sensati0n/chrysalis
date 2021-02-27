import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';

import {
    Button,
    Card,
    Icon,
    ControlGroup,
    RadioGroup,
    FileInput,
    InputGroup,
    Radio
} from  "@blueprintjs/core";

class Configure extends Component {

    state = {
        selectedFile: "Select a file...",
        storedAbiNames: [],
        currentAbi: "",
        currentAbiName: ""
    }

    componentDidMount() {
        let abis = JSON.parse(localStorage.getItem('abis'));
        if(!abis) {
            abis = new Array();
        }
        this.setState({storedAbiNames: abis.map(abi => abi.key)})
    }

    readConfig = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          this.setState({ currentAbi: text })
        };
        reader.readAsText(e.target.files[0]);
        this.setState({selectedFile: e.target.files[0].name});
    }

    storeNetworkConfig = async () => {
        let abis = JSON.parse(localStorage.getItem("abis"));
        if(!abis) {
            abis = new Array();
        }
        abis.push({key: this.state.currentAbiName, abi: this.state.currentAbi });
        localStorage.setItem("abis", JSON.stringify(abis));
        this.setState({storedAbiNames: abis.map(abi => abi.key)})
    }

    deleteNetworkConfig = async () => {
        let abis = JSON.parse(localStorage.getItem("abis"));
        abis = abis.filter(abi => abi.key !== this.state.selectedStoredAbi)
        localStorage.setItem("abis", JSON.stringify(abis));
        this.setState({storedAbiNames: abis.map(abi => abi.key)})
    }
      
    selectedStoredAbiChanged = (event) => {
        this.setState({ selectedStoredAbi: event.target.value });
    };
        
    updateInput = (event) => {
        this.setState({currentAbiName : event.target.value});
    }

    render(){
      return(
        <div>
            <Header />
                <div className="content">
                    <h3>Private Net Configuration</h3>

                    <Card interactive={true} style={{margin: '10px', maxWidth:'500px'}}>

                        <h4> <Icon icon="folder-new" iconSize={32} /> Add a new Configuration</h4>

                        <ControlGroup fill={true} vertical={false}>
                            <InputGroup onChange={this.updateInput} id="text-input" placeholder="Name the configuration..."  intent="primary" />
                            <FileInput  text={this.state.selectedFile} onInputChange={this.readConfig} />
                        </ControlGroup>
                        
                        <Button style={{margin: '10px'}}
                            intent="primary"
                            icon="floppy-disk"
                            onClick={this.storeNetworkConfig}
                        />
                    </Card>

                    <Card interactive={true} style={{margin: '10px', maxWidth:'500px'}}>
                        <h4> <Icon icon="trash" iconSize={32} />Delete an existing Configuration</h4>

                            <RadioGroup
                                label="Available Configurations"
                                onChange={this.selectedStoredAbiChanged}
                                selectedValue={this.state.selectedStoredAbi}
                            >
                                {
                                        this.state.storedAbiNames.map(abiName => {
                                            return (<Radio key={abiName} value={abiName} label={abiName} />)
                                        })
                                }
                            </RadioGroup>

                        <Button style={{margin: '10px'}}
                            intent="warning"
                            icon="eraser"
                            onClick={this.deleteNetworkConfig}
                        />

                    </Card>

                </div>
            </div>
        );
    }
}
  
  export default hot(module)(Configure);