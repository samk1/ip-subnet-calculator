import React, { Component } from "react";
import Ip4Address from "./Ip4Address.js";

export default class IpSubnetCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  get ipAddress() {
    return new Ip4Address(this.state.value);
  }

  get ipAddressDisplay() {
    return this.ipAddress.renderIpAddress();
  }

  render() {
    return (
      <section data-testid="ip_subnet_calculator">
        <header>IP Subnet Calculator</header>
        <input
          type="text"
          label="IP Address"
          data-testid="ip_address_input"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <article data-testid="ip_address_value">{this.ipAddressDisplay}</article>
      </section>
    );
  }
}
