// import { Panel, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { FormControl, Row, Button, Alert } from 'react-bootstrap';
import 'whatwg-fetch';
import Datetime from 'react-datetime';
import moment from 'moment';
import Task from '../note/Note';
import './react-datetime.css';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskName: '',
      newTaskDesc: '',
      newTaskTime: '',
      newTaskError: '',
    };
  }

  updateNewTaskName(text){
    this.setState({
      newTaskName: text,
    });
  }
  updateNewTaskDesc(text){
    this.setState({
      newTaskDesc: text,
    });
  }
  updateNewTaskTime(date){
    if(date instanceof moment){
      this.setState({
        newTaskTime: date.unix(),
      });
    }
  }

  addTask() {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newTaskName,
        description: this.state.newTaskDesc,
        date: this.state.newTaskTime,
      }),
    }).then((res) => {
      if(res.status === 200 || res.status === 201) {
        return res.json();
      }
      throw new Error('Не удалось создать заметку');
    }).then((data) => {
      const newTasks = Object.assign([], this.state.tasks);
      newTasks.unshift(data);
      this.setState({
        tasks: newTasks,
      });
    }).catch((err) => {
      this.setState({
        newTaskError: err.message,
      });
    });
  }

  componentDidMount(){
    fetch('/api/tasks')
    .then((res) => {
      if(res.status === 200){
        return res.json();
      }
      throw new Error('Сервер временно не доступен');
    })
    .then((data) => {
      this.setState({
        tasks: data,
      });
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
        <Row>
          <FormControl onChange={(e) => { this.updateNewTaskName(e.target.value); }} placeholder="Введите название задачи"/>
        </Row>
        <Row>
          <FormControl
            componentClass="textarea"
            placeholder="Введите описание"
            onChange={(e) => { this.updateNewTaskDesc(e.target.value); }}
          />
        </Row>
        <Row>
          <Datetime
            inputProps={{placeholder: 'Введите дату и время в формате dd.mm.yyyy hh:mm'}}
            locale="ru"
            dateFormat="DD.MM.YYYY"
            closeOnSelect={true}
            timeFormat="HH:mm"
            onChange={(date) => { this.updateNewTaskTime(date); }}
          />
        </Row>
        <Row>
          <Button onClick={() => { this.addTask(); }}>Добавить</Button>
        </Row>
        <Row>
          <Alert
            bsStyle="danger"
            className={this.state.newTaskError ? '' : 'hidden'}>{this.state.newTaskError}</Alert>
        </Row>
        <div className="tasks">
          {this.state.tasks.map((task) => <Task
            description={task.description}
            id={task.id}
            key={task.id}
            date={task.date}
            complete={task.complete}
            spoiler={task.spoiler}
          />)}
        </div>
      </div>

    );
  }
}
