import React, { Component } from 'react';

export default class IpSubnetCalculator extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  get ipAddress() {
    return this.state.value;
  }

  render() {
    return (
      <div data-testid="ip_subnet_calculator">
        <header>
          IP Subnet Calculator
        </header>
        <input
          type="text"
          label="IP Address"
          data-testid="ip_address_input"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <p data-testid="ip_address_value">
          {this.ipAddress}
        </p>
      </div>
    )
  }
}
