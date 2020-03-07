import React from "react";
import App from "./App.jsx";
import IpSubnetCalculator from "./IpSubnetCalculator";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

it("renders ip subnet calculator", () => {
  expect(wrapper).toContainExactlyOneMatchingElement(IpSubnetCalculator);
});

it("renders ip address input", () => {
  expect(wrapper.testid("ip_address_input")).toExist();
});

it("sends the input value to IpSubnetCalculator", () => {
  wrapper
    .testid("ip_address_input")
    .simulate("change", { target: { value: "value" } });
  expect(wrapper.find(IpSubnetCalculator).prop("ipAddress")).toBe("value");
});
