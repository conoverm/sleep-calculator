// Calculate Button
import './Calculate.css';
import SleepScoreApi from '../Services/SleepScoreApi.js'
import PropTypes from 'prop-types';

async function calculateScore(scores = { asleep: 0, inBed: 0}) {
  const asleep = Number(scores.asleep);
  const inBed = Number(scores.inBed);

  if (asleep > inBed) {
    throw new Error('Asleep longer than in bed? Impressive.');
  }

  if (inBed === 0) {
    throw new Error('An amount of time for being in bed is required.');
  }

  const score = 100 * asleep / inBed;

  return SleepScoreApi(score);
}

export default function CalculateButton(props) {
  const calculate = () => {
    props.setLoading(true);

    return calculateScore(props.scores)
      .then((res) => props.setScore(Math.ceil(res.data)))
      .catch((err) => props.setScore((err && err.message) || 'Error'))
      .finally(() => props.setLoading(false))
  }

  return (
    <button 
      disabled={props.disabled}
      onClick={calculate}
    >
      Calculate
    </button>
  )
};

CalculateButton.propTypes = {
    setLoading: PropTypes.func,
    disabled: PropTypes.bool,
    scores: PropTypes.object,
    setScore: PropTypes.func
}