import React, { Component } from 'react';
import { Well, Checkbox, Alert } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

import './serials.css';

export default class Serial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      description: '',
      name: '',
      isForMe: false,
    };
  }

  componentDidMount() {
    fetch('/api/serials')
    .then(res => res.json())
    .then(data => {
      let serial;
      for (let s of data) {
        if(s.id === Number(this.state.id)){
          serial = s;
          break;
        }
      }
      this.setState({
        description: serial.description,
        name: serial.name,
        isForMe: Boolean(serial.user),
      });
    });
  }

  changeMyFilm(e) {
    const body = !this.state.isForMe ? {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
      })
    } : {};
    this.setState({
      isForMe: !this.state.isForMe,
    });

    const url = !this.state.isForMe ? '/api/serials' : `/api/serials/${this.state.id}/destroy_serial`;
    fetch(url, body).then(res => {
      if(res.status === 200 || res.status === 201){
        const message = this.state.isForMe ? 'Вы будете получать спойлеры по этому сериалу!' : 'Вы не будете получать спойлеры по этому сериалу!';
        this.setState({
          message,
        });
      } else {
        throw new Error('Сервер временно не доступен!');
      }
    })
    .catch((err) => {
      this.setState({
        error: err.message
      });
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <Well className="description">{this.state.description}</Well>
        <Checkbox onChange={(e) => {this.changeMyFilm(e);}} checked={this.state.isForMe}>Я смотрю этот сериал</Checkbox>
        <Alert className={this.state.message && !this.state.error ? '' : 'hidden'}>{this.state.message}</Alert>
        <Alert bsStyle='danger' className={this.state.error ? '' : 'hidden'}>{this.state.error}</Alert>
        <Link href="#" onClick={browserHistory.goBack} >Назад</Link>
      </div>

    );
  }
}
