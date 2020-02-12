import React from "react";
import { render, fireEvent } from "@testing-library/react";
import IpSubnetCalculator from "./IpSubnetCalculator.jsx";

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
  [
    {
      input: "192.168.0.0/23",
      subnetMask: "255.255.252.0",
      ipAddress: "192.168.0.0/23"
    }
  ].forEach(({ input, subnetMask, ipAddress }) => {
    it("displays the ip address in dotted quad format", () => {
      const { getByTestId } = render(<IpSubnetCalculator />);
      const ipAddressInput = getByTestId("ip_address_input");

      fireEvent.change(ipAddressInput, {
        target: { value: input }
      });

      expect(getByTestId("ip_address_value")).toHaveTextContent(ipAddress);
      pending();
      expect(getByTestId("subnet_mask_value")).toHaveTextContent(subnetMask);
    });
  });
});

describe("when ip address is not valid", () => {
  ["192"].forEach(input => {
    it("does not display the ip address", () => {
      const { getByTestId } = render(<IpSubnetCalculator />);
      const ipAddressInput = getByTestId("ip_address_input");

      fireEvent.change(ipAddressInput, {
        target: { value: input }
      });

      const textElement = getByTestId("ip_address_value");

      expect(textElement).toBeEmpty();
    });
  });
});
