import * as React from 'react';

function WarningSvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        msTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)'
      }}
      viewBox="0 0 12 12"
      transform="rotate(360)"
      {...props}
    >
      <path
        d="M5.214 1.459a.903.903 0 011.572 0l4.092 7.169c.348.61-.089 1.372-.787 1.372H1.91c-.698 0-1.135-.762-.787-1.372l4.092-7.17zM5.5 4.5v1a.5.5 0 001 0v-1a.5.5 0 00-1 0zM6 6.75a.75.75 0 100 1.5.75.75 0 000-1.5z"
        fill="#ff2828"
      />
    </svg>
  );
}

export default WarningSvg;
