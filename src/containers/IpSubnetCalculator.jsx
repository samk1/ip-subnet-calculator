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
    <section data-testid="ipSubnetCalculator">
      {Object.entries(result).map(([name, value]) => (
        <article data-testid={name} key={name}>
          <DottedQuad value={value} />
        </article>
      ))}
      <article data-testid="allocation">
        <IpAllocation ipAddress={result.ipAddress} />
      </article>
    </section>
  );
}
