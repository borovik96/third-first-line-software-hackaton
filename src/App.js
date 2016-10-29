import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
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
        <Grid>
          <Col md={6} mdOffset={3}>
            {this.props.children}
          </Col>
        </Grid>
      </div>
    );
  }
}

export default App;
