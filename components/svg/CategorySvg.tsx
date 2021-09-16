import type { SvgProps } from '@/interfaces/index';

function CategorySvg(props: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        msTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)'
      }}
      viewBox="0 0 20 20"
      transform="rotate(360)"
      {...props}
    >
      <path
        d="M4.5 17a1.5 1.5 0 01-1.493-1.356L3 15.5v-11a1.5 1.5 0 011.356-1.493L4.5 3H9a1.5 1.5 0 011.493 1.355l.007.145v.254l2.189-2.269a1.5 1.5 0 012.007-.138l.116.101 2.757 2.725a1.5 1.5 0 01.111 2.011l-.103.116-2.311 2.2h.234a1.5 1.5 0 011.493 1.355L17 11v4.5a1.5 1.5 0 01-1.355 1.493L15.5 17h-11zm5-6.5H4v5a.5.5 0 00.326.469l.084.023.09.008h5v-5.5zm6 0h-5V16h5a.5.5 0 00.492-.41L16 15.5V11a.5.5 0 00-.41-.492l-.09-.008zm-5-2.79V9.5h1.79L10.5 7.71zM9 4H4.5a.5.5 0 00-.492.41L4 4.5v5h5.5v-5a.5.5 0 00-.326-.469l-.084-.023L9 4z"
        fill="#909090"
        className="svg-active"
      />
    </svg>
  );
}

export default CategorySvg;
