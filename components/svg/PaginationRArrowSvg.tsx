import type { SvgProps } from '@/interfaces/index';

const PaginationRArrowSvg = (props: SvgProps) => {
  return (
    <svg
      {...props}
      x-description="Heroicon name: solid/chevron-right"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        fill="#555"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default PaginationRArrowSvg;
