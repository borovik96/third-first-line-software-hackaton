import { Navbar } from 'react-bootstrap';
import React, { Component } from 'react';

export default class Navigation extends Component {

  render() {
    return (<Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Spoiler motivator</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
