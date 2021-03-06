import { Navbar } from 'react-bootstrap';
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
              <Link className="link" href="/spoiler">Добавить спойлер</Link>
              <Link className="link" href="/login">Вход</Link>
              <Link className="link" href="/register">Регистрация</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
