import React from "react";
import IpSubnetCalculator from "./IpSubnetCalculator.jsx";
import Ip4Address from "./Ip4Address.js";

jest.mock("./Ip4Address.js");

let wrapper;
let testid;

beforeEach(() => {
  Ip4Address.mockClear();
  wrapper = shallow(<IpSubnetCalculator />);
  testid = wrapper.testid.bind(wrapper)
});

it("renders ip subnet calculator", () => {
  expect(testid("ip_subnet_calculator")).toExist();
});

it("renders ip address input", () => {
  expect(testid("ip_address_input")).toExist();
});

describe("when ip address is valid", () => {
  beforeEach(() => {
    Ip4Address.mockImplementation(() => ({
      valid: () => true,
      renderIpAddress: () => "the ip address",
      renderSubnetMask: () => "the subnet mask",
      renderNetworkAddress: () => "the network address",
      renderLowAddress: () => "the low address",
      renderHighAddress: () => "the high address",
      renderBroadcastAddress: () => "the broadcast address"
    }));

    testid("ip_address_input").simulate("change", {target: { value: "value" }});
  });

  it("displays the ip address", () => {
    expect(testid("ip_address_value").text()).toBe("the ip address");
  });

  it("displays the subnet mask", () => {
    expect(testid("subnet_mask_value").text()).toBe("the subnet mask");
  });

  it("displays the network address", () => {
    expect(testid("network_address_value").text()).toBe("the network address");
  });

  it("displays the low address", () => {
    expect(testid("low_address_value").text()).toBe("the low address");
  });

  it("displays the high address", () => {
    expect(testid("high_address_value").text()).toBe("the high address");
  });

  it("displays the broadcast address", () => {
    expect(testid("broadcast_address_value").text()).toBe("the broadcast address");
  });
});

describe("when ip address is not valid", () => {
  beforeEach(() => {
    Ip4Address.mockImplementation(() => ({
      valid: () => false
    }));

    testid("ip_address_input").simulate("change", {target: { value: "value" }});
  });
  it("does not display the ip address", () => {
    expect(testid("ip_address_value").text()).toBe("");
  });
});
