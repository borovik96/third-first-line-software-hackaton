import React, { Component } from 'react';
import { FormGroup, FormControl, Row, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.setNewLoginInfo = props.setNewLoginInfo;
  }

  handlePass(password) {
    this.setState({
      password,
    });
  }

  handleEmail(email) {
    this.setState({
      email,
    });
  }

  sendDataLogin() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios({
      method: 'post',
      url: '/api/auth/sign_in',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [(data) => {
        const newData = [];
        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            newData.push(`${prop}=${data[prop]}`);
          }
        }
        return newData.join('&');
      }],
    })
    .then(res => {
      console.log(this.setNewLoginInfo);
      this.setNewLoginInfo({
        'access-token': res.headers['access-token'],
        client: res.headers.client,
        expiry: res.headers.expiry,
        uid: res.headers.uid,
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h2>Введите данные учётной записи</h2>
        <FormGroup>
          <Row>
            <FormControl
              onChange={(e) => { this.handleEmail(e.target.value);}}
              type="email"
              placeholder="Введите email"
            />
          </Row>
          <Row>
            <FormControl
              onChange={(e) => { this.handlePass(e.target.value);}}
              type="password"
              placeholder="Введите пароль"
            />
          </Row>
          <Row>
            <Button onClick={() => { this.sendDataLogin(); }}>Войти</Button>
          </Row>
        </FormGroup>
      </div>
    );
  }
}
