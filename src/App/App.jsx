import React, { useState } from "react";
import "./App.scss";
import IpSubnetCalculator from "./IpSubnetCalculator";

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
      <form id="ip_address_form">
        <label for="ip_address">IP Address</label>
        <input
          name="ip_address"
          data-testid="ip_address_input"
          {...bind} />
      </form>
      <div id="ip_subnet_calculator">
        <IpSubnetCalculator ipAddress={value} />
      </div>
    </main>
  );
}

export default App;
