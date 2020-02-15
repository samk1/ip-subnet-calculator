import React from "react";
import { calculate, parse } from "./Ip4Address.js";
import DottedQuad from "./DottedQuad.jsx"


function dottedQuad(name, value) {
  return (
    <article key={name}>
      <DottedQuad data-testid={name} value={value}/>
    </article>
  )
}

export default function IpSubnetCalculator(props) {
  const parsed = parse(props.ipAddress);
  const result = parsed ? calculate(parsed) : {
    ipAddress: "",
    subnetMask: "",
    lowAddress: "",
    broadcastAddress: "",
    highAddress: "",
    networkAddress: ""
  }

  return (
    <section data-testid="ipSubnetCalculator">
      {Object.entries(result).map(entry => dottedQuad(...entry))}
    </section>
  );
}
