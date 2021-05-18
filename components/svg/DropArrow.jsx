import PropTypes from 'prop-types';
import { NavArrow } from './styles';

function DropArrow({ Rotate, fill }) {
  return (
    <NavArrow
      Rotate={Rotate}
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="3 3 10 10"
    >
      <path
        fill={fill}
        d="M10.146 7.146a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 
              0 0 1-.708 0l-2.5-2.5a.5.5 0 1 1 .708-.708L8 9.293l2.146-2.147z"
      ></path>
    </NavArrow>
  );
}

DropArrow.propTypes = {
  Rotate: PropTypes.bool,
  fill: PropTypes.string
};

DropArrow.defaultProps = {
  Rotate: false,
  fill: '#fff'
};

export default DropArrow;
