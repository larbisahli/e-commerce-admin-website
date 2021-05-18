import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const LazyRender = ({ children, render, Suspense = null }) => {
  const [Seen, setSeen] = useState(false);

  useEffect(() => {
    if (!Seen && render) {
      setSeen(true);
    }
  }, [render, Seen]);

  return Seen ? children : Suspense;
};

LazyRender.propTypes = {
  children: PropTypes.element.isRequired,
  render: PropTypes.bool.isRequired,
  Suspense: PropTypes.element
};

export default memo(LazyRender);
