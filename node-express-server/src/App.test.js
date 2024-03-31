import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react app landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/React App with CSP nonce setup using Node Express server/i);
  expect(linkElement).toBeInTheDocument();
});
