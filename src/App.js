import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './components/Header';
import "regenerator-runtime/runtime";

import "./App.css";

class App extends Component {

  setAndUpdateConnection = (value) => {
    this.setState({
      handlerValue: value
    })
  }


  render(){

    return(
      <div>
      <Header setAndUpdateConnection={this.setAndUpdateConnection} />
      <div className="App">
        <h1>Decentralized Process Execution</h1>
 

      </div>
      </div>
    );
  }
}

export default hot(module)(App);