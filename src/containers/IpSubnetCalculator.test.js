import React from "react";
import IpSubnetCalculator from "./IpSubnetCalculator.jsx";
import Ip4Address from "./Ip4Address.js";

jest.mock("./Ip4Address.js");

let wrapper;

beforeEach(() => {
  Ip4Address.mockClear();
});

describe("with no props", () => {
  beforeEach(() => {
    wrapper = shallow(<IpSubnetCalculator />);
  });

  it("renders ip subnet calculator", () => {
    expect(wrapper.testid("ip_subnet_calculator")).toExist();
  });

  it("does not send anything to be parsed by Ip4Address", () => {
    expect(Ip4Address).toHaveBeenCalledTimes(1);
  });
});

describe("when ip address prop is valid", () => {
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

    wrapper = shallow(<IpSubnetCalculator ipAddress={"value"} />);
  });

  it("sends the ip address value to be parsed by Ip4Address", () => {
    expect(Ip4Address).toHaveBeenCalledTimes(1);
  });

  it("displays the ip address", () => {
    expect(wrapper.testid("ip_address_value").text()).toBe("the ip address");
  });

  it("displays the subnet mask", () => {
    expect(wrapper.testid("subnet_mask_value").text()).toBe("the subnet mask");
  });

  it("displays the network address", () => {
    expect(wrapper.testid("network_address_value").text()).toBe(
      "the network address"
    );
  });

  it("displays the low address", () => {
    expect(wrapper.testid("low_address_value").text()).toBe("the low address");
  });

  it("displays the high address", () => {
    expect(wrapper.testid("high_address_value").text()).toBe(
      "the high address"
    );
  });

  it("displays the broadcast address", () => {
    expect(wrapper.testid("broadcast_address_value").text()).toBe(
      "the broadcast address"
    );
  });
});
