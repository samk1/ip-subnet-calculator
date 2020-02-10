import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders ip subnet calculator header', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/IP Subnet Calculator/);
  expect(textElement).toBeInTheDocument();
});
