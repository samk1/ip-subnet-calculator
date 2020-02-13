import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import IpSubnetCalculator from "./IpSubnetCalculator.jsx";
import Ip4Address from "./Ip4Address.js";

jest.mock("./Ip4Address.js");

beforeEach(() => {
  Ip4Address.mockClear();
});

it("renders ip subnet calculator", () => {
  const { getByTestId } = render(<IpSubnetCalculator />);
  const container = getByTestId("ip_subnet_calculator");
  expect(container).toBeInTheDocument();
});

it("renders a title", () => {
  const { getByText } = render(<IpSubnetCalculator />);
  const textElement = getByText(/IP Subnet Calculator/);
  expect(textElement).toBeInTheDocument();
});

it("renders ip address input", () => {
  const { getByTestId } = render(<IpSubnetCalculator />);
  const ipAddressInput = getByTestId("ip_address_input");
  expect(ipAddressInput).toBeInTheDocument();
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

    render(<IpSubnetCalculator />);

    fireEvent.change(screen.getByTestId("ip_address_input"), {
      target: { value: "value" }
    });
  });

  it("displays the ip address", () => {
    expect(screen.getByTestId("ip_address_value")).toHaveTextContent(
      "the ip address"
    );
  });

  it("displays the subnet mask", () => {
    expect(screen.getByTestId("subnet_mask_value")).toHaveTextContent(
      "the subnet mask"
    );
  });

  it("displays the network address", () => {
    expect(screen.getByTestId("network_address_value")).toHaveTextContent(
      "the network address"
    );
  });

  it("displays the low address", () => {
    expect(screen.getByTestId("low_address_value")).toHaveTextContent(
      "the low address"
    );
  });

  it("displays the high address", () => {
    expect(screen.getByTestId("high_address_value")).toHaveTextContent(
      "the high address"
    );
  });

  it("displays the broadcast address", () => {
    expect(screen.getByTestId("broadcast_address_value")).toHaveTextContent(
      "the broadcast address"
    );
  });
});

describe("when ip address is not valid", () => {
  beforeEach(() => {
    Ip4Address.mockImplementation(() => ({
      valid: () => false
    }));

    render(<IpSubnetCalculator />);

    fireEvent.change(screen.getByTestId("ip_address_input"), {
      target: { value: "value" }
    });
  });
  it("does not display the ip address", () => {
    expect(screen.getByTestId("ip_address_value")).toBeEmpty();
  });
});
