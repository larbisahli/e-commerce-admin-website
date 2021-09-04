import type { SvgProps } from '@/interfaces/index';

const PaginationLArrowSvg = (props: SvgProps) => {
  return (
    <svg
      {...props}
      x-description="Heroicon name: solid/chevron-left"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        fill="#555"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default PaginationLArrowSvg;
