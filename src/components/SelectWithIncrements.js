// SELECT with OPTIONS in 30 minute increments 
import './SelectWithIncrements.css';
import uniqueid from 'lodash.uniqueid';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function timeIncrement() {
  return Array(49)
    .fill(0)
    .map((_, ind) => ((ind) * 30))
    .reduce(
      (acc, cur) => {
        const hours = cur / 60;
        let label = '';

        if (cur < 60) {
          label = `${cur.toString()} minutes`
        }

        if (cur === 60) {
          label = `1 hour`
        }

        if (cur === 90) {
          label = `1 hour and 30 minutes`
        }

        if (cur > 90 ) {
          label = (cur % 60 === 0)
          ? `${hours} hours`
          : `${Math.floor(hours).toString()} hours and 30 minutes`;
        }

        acc.push( {
          minutes: cur,
          label,
        })

        return acc;
      }, []
    );
}

export default function SelectWithIncrements(props) {
    const [id] = useState(uniqueid('select-id-'));

    return (
      <div className="SelectWithIncrement">
        <label htmlFor={id}>{props.label}</label>

        <select 
          value={props.val} 
          name={id}
          onChange={props.onChange}
        >

          {timeIncrement().map((increment, ind) => {
            return <option 
              key={`option-${ind}`}
              value={increment.minutes}
            >
              {increment.label}
            </option>
          })}
        </select> 
      </div>
    )
}

SelectWithIncrements.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]),
};