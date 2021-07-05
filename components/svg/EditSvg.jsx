import React from 'react';

const EditSvg = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      style={{ transform: 'rotate(360deg)' }}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
    >
      <g fill="none">
        <path
          d="M13.657 2.344a2 2 0 0 1 0 2.828L6.27 12.559a2.5 2.5 0 0 1-1.161.657l-2.291.573a.5.5 0 0 1-.606-.607l.572-2.29a2.5 2.5 0 0 1 .658-1.162l7.386-7.386a2 2 0 0 1 2.829 0zm-3.536 2.12L4.15 10.438a1.5 1.5 0 0 0-.394.697l-.371 1.483l1.482-.371a1.5 1.5 0 0 0 .697-.395l5.972-5.972l-1.414-1.414zm1.415-1.413l-.708.707l1.414 1.414l.708-.707a1 1 0 0 0-1.414-1.414z"
          fill='#7ce900'
        />
      </g>
    </svg>
  );
};

export default EditSvg;
