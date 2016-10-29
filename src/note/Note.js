import { Panel, Button, Alert, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import 'whatwg-fetch';

import './Note.css';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.params.task || props.id,
      name: props.name,
      desc: props.desc,
      time: props.time,
      isComplete: props.isComplete,
      spoiler: props.spoiler,
      serverReq: {},
      isWritable: false,
      saveButtonText: 'Изменить',
      error: '',
    };
  }

  componentDidMount(){
    if(!this.state.name){
      fetch(`/api/tasks/${this.state.id}`)
      .then((res) => {
        if(res.status === 200){
          return res.json();
        }
        throw new Error('Сервер временно не доступен');
      })
      .then((data) => {
        this.setState({
          name: data.name,
          desc: data.description,
          isComplete: data.complete
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message
        });
      });
    }
  }

  setComplete() {
    this.setState({
      isComplete: true,
    });
    this.saveTask();
  }

  saveTask(){
    fetch(`/api/tasks/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.desc,
        complete: this.state.isComplete,
        date: this.state.time,
      })
    }).then((res) => {
      if(res.status !== 200) throw new Error(`Error: ${res.status} ${res.statusText}`);
    })
    .catch((err) => {
      this.setState({
        error: err.message,
      });
    });
  }

  saveButtonClick(){
    if(this.state.isWritable){
      this.setState({ //Save
        isWritable: false,
        saveButtonText: 'Изменить',
        desc: this.desc.innerHTML
      });
      this.saveTask();
    } else {
      this.setState({
        isWritable: true,
        saveButtonText: 'Сохранить',
      });
    }
  }
  render() {
    return (
      <Panel className="note">
        <h3>{this.state.name}</h3>
        <p
          className={`${this.state.isComplete ? 'complete' : ''}`}
          ref={(input) => { this.desc = input;}}
          contentEditable={this.state.isWritable}
        >{this.state.desc}</p>
        <p className="time-to-complete">{this.state.time}</p>
        <Row>
          <Button onClick={() => { this.setComplete();}} bsStyle="success">Выполненно</Button>
          <Button onClick={() => { this.saveButtonClick(); }}>{this.state.saveButtonText}</Button>
        </Row>
        <Row>
          <Alert
            className={this.state.error ? '' : 'hidden'}
            bsStyle="danger"
          >{this.state.error}</Alert>
        </Row>

      </Panel>
    );
  }
}
