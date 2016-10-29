import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import React, { Component } from 'react';

export default class Navigation extends Component {

  render() {
    return (<Navbar>
        <Navbar.Header>
          <Navbar.Brand>
          <Link href="/">Spoiler motivator</Link>
            <Link href="/setting">Настройка сериалов</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
