import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router';
import './setting.css';

export default class Setting extends Component{
  constructor(props) {
    super(props);
    this.state = {
      allSerials: [],
      userSerials: [],
      userSerialsId: [],
    };
  }

  isMySerial(serial) {
    return this.state.userSerials.map(serial => serial.id).includes(serial.id);
  }

  componentDidMount() {
    fetch('/api/serials')
    .then((res) => {
      if(res.status === 200 || res.status === 201) return res.json();
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    })
    .then((data) => {
      this.setState({
        allSerials: data,
      });
    })
    .catch((err) => {
      this.setState({
        error: err.message,
      });
    });

    fetch('/api/user/serials')
    .then((res) => {
      if(res.status === 200 || res.status === 201) return res.json();
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    })
    .then((data) => {
      this.setState({
        userSerials: data,
      });
    })
    .catch((err) => {
      this.setState({
        error: err.message,
      });
    });

  }
  render(){
    return(
      <div>
        <h4>Выберите фильмы и сериалы, которые вы смотрите:</h4>
        <Col md={7} mdOffset={1}>
            {this.state.allSerials.map(
              serial => <div
                className="serial-item"
                key={serial.id}
              >
                <Link
                  href={`/serials/${serial.id}`}
                >{serial.name}{this.isMySerial(serial) ? ' (Да)' : ' (Нет)'}</Link>
                <br/>
              </div>
            )}
        </Col>
      </div>
    );
  }
}
