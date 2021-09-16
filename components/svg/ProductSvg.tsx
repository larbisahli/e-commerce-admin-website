import type { SvgProps } from '@/interfaces/index';

const ProductSvg = (props: SvgProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      style={{ transform: 'rotate(360deg)' }}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 20 20"
    >
      <g fill="none">
        <path
          d="M8 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8zM7 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4z"
          fill="#1e87f0"
        />
        <path
          d="M4 6a2 2 0 0 1 1-1.732V14.5A2.5 2.5 0 0 0 7.5 17h6.232A2 2 0 0 1 12 18H7.5A3.5 3.5 0 0 1 4 14.5V6z"
          fill="#1e87f0"
        />
      </g>
    </svg>
  );
};

export default ProductSvg;
