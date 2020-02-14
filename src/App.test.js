import React from "react";
import App from "./App";
import IpSubnetCalculator from "./containers/IpSubnetCalculator";

test("renders ip subnet calculator", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toContainExactlyOneMatchingElement(IpSubnetCalculator);
});
