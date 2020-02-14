import React from "react";
import Ip4Address from "./Ip4Address.js";

export default function IpSubnetCalculator(props) {
  const ipAddress = new Ip4Address(props.ipAddress);
  return (
    <section data-testid="ip_subnet_calculator">
      <article data-testid="ip_address_value">
        {ipAddress.renderIpAddress()}
      </article>
      <article data-testid="subnet_mask_value">
        {ipAddress.renderSubnetMask()}
      </article>
      <article data-testid="network_address_value">
        {ipAddress.renderNetworkAddress()}
      </article>
      <article data-testid="low_address_value">
        {ipAddress.renderLowAddress()}
      </article>
      <article data-testid="high_address_value">
        {ipAddress.renderHighAddress()}
      </article>
      <article data-testid="broadcast_address_value">
        {ipAddress.renderBroadcastAddress()}
      </article>
    </section>
  );
}
