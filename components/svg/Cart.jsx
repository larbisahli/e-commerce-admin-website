function Cart(props) {
  return (
    <svg
      role="img"
      title="Shopping cart"
      viewBox="0 0 64 64"
      pointerEvents="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M62 22H16M2 6h10l10 40h32"
        fill="none"
        stroke="#dfdfdf"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <circle cx="24" cy="58" r="5" fill="#dfdfdf" />
      <circle cx="50" cy="58" r="5" fill="#dfdfdf" />
      <path
        d="M59 30H26m30 8H28"
        fill="none"
        stroke="#dfdfdf"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  );
}

export default Cart;
