// Text Output
import PropTypes from 'prop-types';

export default function TextOutput(props) {
    
    if (props.isLoading === true) {
        return (<div>Loading</div>);
    }

    if (typeof props.output === 'number') {
        return (<div>Sleep score: {props.output}%</div>);
    }

    if (typeof props.output === 'string') {
        return (<div>{props.output}</div>);
    }

    return (<div/>)
};

TextOutput.propTypes = {
    isLoading: PropTypes.bool,
    output: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}