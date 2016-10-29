import { Navbar, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import React, { Component } from 'react';
import './Nav.css';

export default class Navigation extends Component {

  render() {
    return (<Navbar>
        <Navbar.Header>
          <Navbar.Brand>
              <Link className="link" href="/">Список заметок</Link>
              <Link className="link" href="/setting">Настройка сериалов</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
