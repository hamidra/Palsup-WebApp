import React, { Component } from 'react';

export default class sseForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  async handleSubmit(event) {
    var es = new EventSource(
      `http://172.17.20.26:3000/notifications/${this.state.value}`
    );
    es.onmessage = event => console.log(JSON.stringify(event.data));
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <div>
          <input
            value={this.state.value}
            type="text"
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Server Sent Event
          </button>
        </div>
      </form>
    );
  }
}
