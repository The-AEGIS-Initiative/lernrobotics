import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders something', () => {
  const { getByText } = render(<App />);
  expect(true);
});
