import React, { Component } from 'react';
import './App.css';

import Nav from './nav/Nav';

class App extends Component {
  constructor(){
    super();
    this.state = {

    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Nav/>
        </div>
      </div>
    );
  }
}

export default App;
