import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Header from './Header';


import {Navbar, Button} from  "@blueprintjs/core";

class Deploy extends Component{
    render(){
      return(
          <div>
                    <Header />
                    <h1>Deploy</h1>

          </div>
      );
    }
  }
  
  export default hot(module)(Deploy);