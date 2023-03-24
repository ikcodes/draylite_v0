import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders draylite', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
