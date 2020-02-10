import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IpSubnetCalculator from './IpSubnetCalculator.jsx';

it('renders ip subnet calculator', () => {
  const { getByTestId } = render(<IpSubnetCalculator />);
  const container = getByTestId('ip_subnet_calculator');
  expect(container).toBeInTheDocument();
});

it('renders a title', () => {
  const { getByText } = render(<IpSubnetCalculator />);
  const textElement = getByText(/IP Subnet Calculator/);
  expect(textElement).toBeInTheDocument();
})

it('renders ip address input', () => {
  const { getByTestId } = render(<IpSubnetCalculator />);
  const ipAddressInput = getByTestId('ip_address_input')
  expect(ipAddressInput).toBeInTheDocument();
});

describe('when ip address is valid', () => {
  [
    ['192.168.0.0/23', '192.168.0.0/23']
    // ['1.1.1.1', '1.1.1.1/32'],
  ].forEach(([input, expected]) => {
    it('displays the ip address in dotted quad format', () => {
      const { getByTestId } = render(<IpSubnetCalculator />);
      const ipAddressInput = getByTestId('ip_address_input')

      fireEvent.change(ipAddressInput, {
        target: {value: input}
      })

      const textElement = getByTestId('ip_address_value')

      expect(textElement).toHaveTextContent(expected)
    })
  })
})
