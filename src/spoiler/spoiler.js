import React, { Component } from 'react';
import { Row, FormControl, Button, Alert } from 'react-bootstrap';

export default class Spoiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serials: [],
      activeSerialId: '',
      spoilerText: '',
    };
  }

  setNewSerial(id) {
    this.setState({
      activeSerialId: id,
    });
  }

  updateSpoilerText(spoilerText){
    this.setState({
      spoilerText,
    });
  }

  addSpoiler() {
    fetch(`/api/serials/${this.state.activeSerialId}/spoilers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.spoilerText,
        serial_id: Number(this.state.activeSerialId),
      })
    })
    .then(res => {
      if(res.status === 201 || res.status === 200) this.setState({
        message: 'Спойлер добавлен',
      }); else {
        throw new Error('Ошибка сервера');
      }

    })
    .catch(err => {
      this.setState({
        error: err.message,
      });
    });
  }

  componentDidMount() {
    fetch('/api/serials')
    .then(res => res.json())
    .then(serials => {
      this.setState({
        serials: serials,
      });
      this.setNewSerial(this.serial.props.defaultValue);

    });
  }

  render() {
    return (
      <div>
        <h2>Добавьте спойлер к сериалу</h2>
        <Row>
            <FormControl
              ref={(sel) => {this.serial = sel;}}
              defaultValue={this.state.serials[0] ? this.state.serials[0].id : ''}
              onChange={(e) => {this.setNewSerial(e.target.value);}}
              componentClass="select"
            >
              {this.state.serials.map(serial =>
                <option
                  key={serial.id}
                  value={serial.id}
                >{serial.name}</option>)
              }
            </FormControl>
        </Row>
        <Row>
          <FormControl
            componentClass="textarea"
            placeholder="Введите спойлер"
            onChange={(e) => { this.updateSpoilerText(e.target.value); }}
          />
        </Row>
        <Row>
          <Button onClick={() => { this.addSpoiler(); }}>Добавить</Button>
        </Row>
        <Alert className={this.state.message && !this.state.error ? '' : 'hidden'}>{this.state.message}</Alert>
        <Alert bsStyle='danger' className={this.state.error ? '' : 'hidden'}>{this.state.error}</Alert>
      </div>
    );
  }
}
