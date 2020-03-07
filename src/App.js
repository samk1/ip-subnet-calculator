import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IpSubnetCalculator from "./containers/IpSubnetCalculator.jsx";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
}

function App() {
  const { value, bind } = useInput();

  return (
    <main>
      <div id="ip_address_input">
        <input data-testid="ip_address_input" {...bind} />
      </div>
      <div id="ip_subnet_calculator">
        <IpSubnetCalculator ipAddress={value} />
      </div>
    </main>
  );
}

export default App;
