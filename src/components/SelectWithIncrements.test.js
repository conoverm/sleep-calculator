import { render, screen } from '@testing-library/react';
import SelectWithIncrements from './SelectWithIncrements.js';

it('render a select that has a label', () => {
  const label = "a label"
  
  render( <SelectWithIncrements 
    label={label} />);

  const selectLabel = screen.getByText(label);

  expect(selectLabel).toBeInTheDocument();
});

it('render 24 hours of options in 30 minute increments', () => {
  render( <SelectWithIncrements />);

  const options = [...document.getElementsByTagName('option')];
  
  options.forEach((option, ind) => {
    expect(option.value).toEqual((ind * 30).toString())
  })  
});