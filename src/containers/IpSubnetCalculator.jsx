import React from "react";
import { calculate, parse } from "./Ip4Address.js";
import DottedQuad from "./DottedQuad.jsx";
import IpAllocation from "./IpAllocation.jsx";

export default function IpSubnetCalculator(props) {
  const parsed = parse(props.ipAddress);
  const result = parsed
    ? calculate(parsed)
    : {
        ipAddress: "",
        subnetMask: "",
        lowAddress: "",
        broadcastAddress: "",
        highAddress: "",
        networkAddress: ""
      };

  return (
    <dl>
      <dt>IP Address</dt>
      <dd data-testid="ipAddress">
        <DottedQuad value={result.ipAddress} />
      </dd>

      <dt>Subnet Mask</dt>
      <dd data-testid="subnetMask">
        <DottedQuad value={result.subnetMask} />
      </dd>

      <dt>Low Address</dt>
      <dd data-testid="lowAddress">
        <DottedQuad value={result.lowAddress} />
      </dd>

      <dt>High Address</dt>
      <dd data-testid="highAddress">
        <DottedQuad value={result.highAddress} />
      </dd>

      <dt>Network Address</dt>
      <dd data-testid="networkAddress">
        <DottedQuad value={result.networkAddress} />
      </dd>

      <dt>Broadcast Address</dt>
      <dd data-testid="broadcastAddress">
        <DottedQuad value={result.broadcastAddress} />
      </dd>
    </dl>
  );
}
