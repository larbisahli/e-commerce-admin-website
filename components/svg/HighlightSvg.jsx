import React from 'react';

const HighlightSvg = (props) => {
  return (
    <svg {...props} viewBox="0 0 64 64">
      <path
        d="M0 58.3L11.7 62l4.2-4.1L8 50l-8 8.3zm14.6-28.1a4.3 4.3 0 0 0-1.2 4.4l1.5 5-6 6L20.2 57l6-6 5 1.5a4.3 4.3 0 0 0 4.5-1.2l4.2-4.9L19.5 26l-4.9 4.2zM62 11.4L54.6 4a6.5 6.5 0 0 0-8.8-.3L22.4 23.6l20 19.9 19.9-23.3a6.4 6.4 0 0 0-.3-8.8z"
        fill="#393235"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default HighlightSvg;
