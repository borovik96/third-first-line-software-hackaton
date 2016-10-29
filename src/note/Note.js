import { Panel, Button, Alert, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import 'whatwg-fetch';
import moment from 'moment';
import './Note.css';

export default class Note extends Component {
  constructor(props) {
    super(props);
    const id = props.params ? props.params.task : props.id;
    this.state = {
      id,
      name: props.name,
      description: props.description,
      date: props.date,
      complete: props.complete,
      spoiler: props.spoiler,
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
          description: data.description,
          complete: data.complete,
          date: data.date,
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
      complete: true,
    });
    this.saveTask(true);
  }

  isSpoiler() {
    return this.state.date > Date.now()/1000;
  }

  saveTask(cmp){
    fetch(`/api/tasks/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        complete: cmp,
      })
    }).then((res) => {
      if(res.status !== 200) throw new Error(`Error: ${res.status} ${res.statusText}`);
      this.setState({
        error: '',
      });
    })
    .catch((err) => {
      this.setState({
        error: err.message,
      });
      // this.setState({
      //   isWritable: true,
      //   saveButtonText: 'Сохранить',
      // });
    });
  }

  // saveButtonClick(){
  //   if(this.state.isWritable){
  //     const desc = this.description.textContent;
  //     this.setState({ //Save
  //       isWritable: false,
  //       saveButtonText: 'Изменить',
  //       description: desc,
  //     });
  //     console.log(this.state.description, desc);
  //     this.saveTask();
  //   } else {
  //     this.setState({
  //       isWritable: true,
  //       saveButtonText: 'Сохранить',
  //     });
  //   }
  // }
  render() {
    return (
      <Panel className="note">
        <h3>{this.state.name}</h3>
        <p
          className={`${this.state.complete ? 'complete' : ''} note`}
          ref={(input) => { this.description = input;}}
          contentEditable={this.state.isWritable}
        >{this.state.description}</p>
        <p className="date-to-complete">{moment.unix(this.state.date).locale('ru').format('DD.MM.YYYY HH:mm')}</p>
        <Row>
          <Button disabled={this.state.complete} onClick={() => { this.setComplete();}} bsStyle="success">Выполненно</Button>
          {/* <Button onClick={() => { this.setComplete();}} bsStyle="success">Подробнее</Button> */}
          {/* <Button onClick={() => { this.saveButtonClick(); }}>{this.state.saveButtonText}</Button> */}
        </Row>
        <Row>
          <Alert
            className={this.state.error ? '' : 'hidden'}
            bsStyle="danger"
          >{this.state.error}</Alert>
        </Row>
        <Row>
          <Alert
            className={this.isSpoiler() ? 'hidden' : ''}
            bsStyle="danger"
          >{this.state.spoiler}</Alert>
        </Row>

      </Panel>
    );
  }
}
