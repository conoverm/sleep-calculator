import { render, screen } from '@testing-library/react';
import TextOutput from './TextOutput.js';

it('renders a div by default', () => {
    const { container } = render( <TextOutput />);

    expect(container.innerHTML).toEqual('<div></div>')
});

it('renders Loading if in loading state', () => {
    render( <TextOutput isLoading={true} />);

    const loading = screen.getByText('Loading');

    expect(loading).toBeInTheDocument();
});

it('renders a little extra text if passed a number', () => {
    render( <TextOutput output={99} />);

    const score = screen.getByText(/Sleep score/g);

    expect(score).toBeInTheDocument();
});

it('renders whatever string is passed to it if given a string', () => {
    render( <TextOutput output="some text" />);

    const score = screen.getByText("some text");

    expect(score).toBeInTheDocument();
});

