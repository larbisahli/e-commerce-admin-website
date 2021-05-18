import { G1, G2 } from './styles';

function DoubleArrow(props) {
  return (
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 10 9"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G1 fill="##b9b9b9" fillRule="nonzero">
          <path d="M2.76,3.5,0,5.93,1,7,5,3.5,1,0,0,1.07Z"></path>
        </G1>
      </g>
      <svg
        width="12px"
        height="12px"
        viewBox="0 0 4 12"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <G2 fill="#b9b9b9" fillRule="nonzero">
            <path d="M2.76,3.5,0,5.93,1,7,5,3.5,1,0,0,1.07Z"></path>
          </G2>
        </g>
      </svg>
    </svg>
  );
}

export default DoubleArrow;
