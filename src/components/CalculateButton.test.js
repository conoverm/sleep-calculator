import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CalculateButton from './CalculateButton';
import SleepScoreApi from '../Services/SleepScoreApi.js'
jest.mock('../Services/SleepScoreApi.js');

beforeEach(() => {
  SleepScoreApi.mockClear();
});

it('can render a disabled button', () => {
    let { container } = render( <CalculateButton /> );

    expect(container.innerHTML).not.toContain('disabled')

    container = render(
        <CalculateButton disabled={true} /> 
    ).container;
    
    expect(container.innerHTML).toContain('disabled')
});

it('calls SleepScoreApi on calculate', () => {
    const setLoadingMock = jest.fn();
    const setScoreMock = jest.fn();
    render( <CalculateButton 
        setLoading={setLoadingMock}
        setScore={setScoreMock}
        scores= {
            {
                inBed: 1,
                asleep: 0
            }
        }
    />);

    expect(SleepScoreApi).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText('Calculate'))

    expect(SleepScoreApi).toHaveBeenCalledTimes(1);
});

it('returns sleep score', async () => {
    const setLoadingMock = jest.fn();
    const setScoreMock = jest.fn();
    const { rerender } = render(<CalculateButton 
        setLoading={setLoadingMock}
        setScore={setScoreMock}
        scores= {
            {
                inBed: 100,
                asleep: 100
            }
        }
    />);

    userEvent.click(screen.getByText('Calculate'))
    
    await waitFor(() => expect(SleepScoreApi).toHaveBeenCalledWith(100));

    rerender(<CalculateButton 
        setLoading={setLoadingMock}
        setScore={setScoreMock}
        scores= {
            {
                inBed: 100,
                asleep: 25
            }
        }
    />);

    userEvent.click(screen.getByText('Calculate'))
    
    await waitFor(() => expect(SleepScoreApi).toHaveBeenCalledWith(25));
    
});

it('returns error if no time in bed score', async () => {
    const setLoadingMock = jest.fn();
    const setScoreMock = jest.fn();
    render( <CalculateButton 
        setLoading={setLoadingMock}
        setScore={setScoreMock}
        scores= {
            {
                inBed: 0,
                asleep: 100
            }
        }
    />);

    expect(setScoreMock).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText('Calculate'))
    
    await waitFor(() => expect(setScoreMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(setScoreMock).toHaveBeenCalledWith('Asleep longer than in bed? Impressive.'));
});

it('returns error no time in bed', async () => {
    const setLoadingMock = jest.fn();
    const setScoreMock = jest.fn();
    render( <CalculateButton 
        setLoading={setLoadingMock}
        setScore={setScoreMock}
        scores= {
            {
                inBed: 0,
                asleep: 0
            }
        }
    />);

    expect(setScoreMock).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText('Calculate'))
    
    await waitFor(() => expect(setScoreMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(setScoreMock).toHaveBeenCalledWith('An amount of time for being in bed is required.'));
});

it('handles an error from SleepScoreApi', async () => {
    SleepScoreApi.mockImplementationOnce(() => Promise.reject());
    const setLoadingMock = jest.fn();
    const setScoreMock = jest.fn();
    render( <CalculateButton 
        setLoading={setLoadingMock}
        setScore={setScoreMock}
        scores= {
            {
                inBed: 100,
                asleep: 100
            }
        }
    />);

    expect(setScoreMock).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText('Calculate'))
    
    await waitFor(() => expect(setScoreMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(setScoreMock).toHaveBeenCalledWith("Error"));
});
