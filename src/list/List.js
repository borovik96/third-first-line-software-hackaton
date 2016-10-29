// import { Panel, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import 'whatwg-fetch';
import Task from '../task/Task';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount(){
    fetch('/');
  }

  render() {
    return (
      <div className="tasks">
        {this.state.map((task) => <Task
          desc={task.desc}
          id={task.id}
          time={task.time}
          isComplete={task.isComplete}
          spoiler={task.spoiler}
        />)}
      </div>
    );
  }
}
