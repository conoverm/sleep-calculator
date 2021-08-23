import { render, screen } from '@testing-library/react';
import App from './App';

it('renders required elements', () => {
  render( <App /> );
  const inBed = screen.getByText(/Duration in Bed/i);
  const asleep = screen.getByText(/Duration Asleep/i);
  const button = screen.getByText('Calculate')

  expect(inBed).toBeInTheDocument();
  expect(asleep).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
