import type { SvgProps } from '@/interfaces/index';

const BookmarkSvg = (props: SvgProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
    >
      <g fill="none">
        <path
          className="svg-active"
          fill="#909090"
          d="M3.78 13.919a.5.5 0 0 1-.778-.416V4.012a2 2 0 0 1 1.996-2l6-.011a2 2 0 0 1 2.004 1.996v9.506a.5.5 0 0 1-.778.416l-4.222-2.82l-4.223 2.82z"
        />
      </g>
    </svg>
  );
};

export default BookmarkSvg;
