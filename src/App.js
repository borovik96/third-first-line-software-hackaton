import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import './App.css';

import Nav from './nav/Nav';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loginInfo: {
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        expiry: localStorage.getItem('expiry'),
        uid: localStorage.getItem('uid'),
      }
    };
  }

  setNewLoginInfo(info) {
    localStorage.setItem('access-token', info['access-token']);
    localStorage.setItem('client', info.client);
    localStorage.setItem('expiry', info.expiry);
    localStorage.setItem('uid', info.uid);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Nav/>
        </div>
        <Grid>
          <Col md={6} mdOffset={3}>
            {React.cloneElement(this.props.children, {
              setNewLoginInfo: this.setNewLoginInfo.bind(this),
              loginInfo: this.state.loginInfo,
            })}
          </Col>
        </Grid>
      </div>
    );
  }
}

export default App;
