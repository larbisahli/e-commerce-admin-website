import type { SvgProps } from '@/interfaces/index';

const EyeSvg = (props: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      style={{
        msTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)'
      }}
      viewBox="0 0 16 16"
      transform="rotate(360)"
      {...props}
    >
      <g fill="#7ce900">
        <path d="M2.984 8.625v.003a.5.5 0 01-.612.355c-.431-.114-.355-.611-.355-.611l.017-.062s.026-.084.047-.145a6.7 6.7 0 011.117-1.982C4.097 5.089 5.606 4 8 4c2.395 0 3.904 1.089 4.801 2.183a6.7 6.7 0 011.117 1.982 3.916 3.916 0 01.06.187l.003.013.002.004v.002a.5.5 0 01-.966.258l-.001-.004-.008-.025a4.9 4.9 0 00-.2-.52 5.703 5.703 0 00-.78-1.263C11.285 5.912 10.044 5 8 5c-2.044 0-3.286.912-4.028 1.817a5.701 5.701 0 00-.945 1.674 3.018 3.018 0 00-.035.109l-.008.025z" />
        <path d="M8 7a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
      </g>
    </svg>
  );
};

export default EyeSvg;
