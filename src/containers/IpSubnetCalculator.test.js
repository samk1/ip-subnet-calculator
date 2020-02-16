import React from "react";
import IpSubnetCalculator from "./IpSubnetCalculator.jsx";
import IpAllocation from "./IpAllocation.jsx"
import { calculate, parse } from "./Ip4Address.js";
import DottedQuad from "./DottedQuad.jsx";

jest.mock("./Ip4Address.js", () => ({
  parse: jest.fn(),
  calculate: jest.fn()
}));

let wrapper;

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
    parse.mockImplementation(() => true);

    calculate.mockImplementation(() => ({
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
    expect(
      wrapper
        .testid("ipAddress")
        .find(DottedQuad)
        .prop("value")
    ).toBe("the ip address");
  });

  it("displays the subnet mask", () => {
    expect(
      wrapper
        .testid("subnetMask")
        .find(DottedQuad)
        .prop("value")
    ).toBe("the subnet mask");
  });

  it("displays the network address", () => {
    expect(
      wrapper
        .testid("networkAddress")
        .find(DottedQuad)
        .prop("value")
    ).toBe("the network address");
  });

  it("displays the low address", () => {
    expect(
      wrapper
        .testid("lowAddress")
        .find(DottedQuad)
        .prop("value")
    ).toBe("the low address");
  });

  it("displays the high address", () => {
    expect(
      wrapper
        .testid("highAddress")
        .find(DottedQuad)
        .prop("value")
    ).toBe("the high address");
  });

  it("displays the broadcast address", () => {
    expect(
      wrapper
        .testid("broadcastAddress")
        .find(DottedQuad)
        .prop("value")
    ).toBe("the broadcast address");
  });

  it("passes the ip address to the IpAllocation component", () => {
    expect(
      wrapper
        .testid("allocation")
        .find(IpAllocation)
        .prop("ipAddress")
    ).toBe("the ip address")
  })

});

describe("when the ip address prop is invalid", () => {
  beforeEach(() => {
    parse.mockImplementation(() => null);
    wrapper = shallow(<IpSubnetCalculator />);
  });

  it("doesn't display anything", () => {
    const values = [
      "ipAddress",
      "subnetMask",
      "networkAddress",
      "lowAddress",
      "highAddress",
      "broadcastAddress"
    ];

    expect(
      values.map(value =>
        wrapper
          .testid(value)
          .find(DottedQuad)
          .prop("value")
      )
    ).toEqual(["", "", "", "", "", ""]);
  });
});
