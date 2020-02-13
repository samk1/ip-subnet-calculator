import React, { Component } from "react";
import Ip4Address from "./Ip4Address.js";

export default class IpSubnetCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      ipAddress: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      ipAddress: new Ip4Address(event.target.value)
    });
  }

  get ipAddressDisplay() {
    return this.valid ? this.state.ipAddress.renderIpAddress() : ""
  }

  get subnetMaskDisplay() {
    return this.valid ? this.state.ipAddress.renderSubnetMask() : ""
  }

  get networkAddressDisplay() {
    return this.valid ? this.state.ipAddress.renderNetworkAddress() : ""
  }

  get lowAddressDisplay() {
    return this.valid ? this.state.ipAddress.renderLowAddress() : ""
  }

  get valid() {
    return this.state.ipAddress ? this.state.ipAddress.valid() : false;
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
        <article data-testid="subnet_mask_value">{this.subnetMaskDisplay}</article>
        <article data-testid="network_address_value">{this.networkAddressDisplay}</article>
        <article data-testid="low_address_value">{this.lowAddressDisplay}</article>
      </section>
    );
  }
}
