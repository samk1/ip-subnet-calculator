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
    expect(wrapper.testid("ipSubnetCalculator")).toExist();
  });
});

describe("when ip address prop is valid", () => {
  beforeEach(() => {
    Ip4Address.parse.mockImplementation(() => true);

    Ip4Address.calculate.mockImplementation(() => ({
      ipAddress: "the ip address",
      subnetMask: "the subnet mask",
      networkAddress: "the network address",
      lowAddress: "the low address",
      highAddress: "the high address",
      broadcastAddress: "the broadcast address"
    }));

    wrapper = shallow(<IpSubnetCalculator ipAddress={"value"} />);
  });

  it("displays the ip address", () => {
    expect(wrapper.testid("ipAddress").prop("value")).toBe("the ip address");
  });

  it("displays the subnet mask", () => {
    expect(wrapper.testid("subnetMask").prop("value")).toBe("the subnet mask");
  });

  it("displays the network address", () => {
    expect(wrapper.testid("networkAddress").prop("value")).toBe(
      "the network address"
    );
  });

  it("displays the low address", () => {
    expect(wrapper.testid("lowAddress").prop("value")).toBe("the low address");
  });

  it("displays the high address", () => {
    expect(wrapper.testid("highAddress").prop("value")).toBe(
      "the high address"
    );
  });

  it("displays the broadcast address", () => {
    expect(wrapper.testid("broadcastAddress").prop("value")).toBe(
      "the broadcast address"
    );
  });
});
