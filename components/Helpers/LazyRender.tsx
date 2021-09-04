import { memo, ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
  render: boolean;
  Suspense?: ReactNode | null;
};

const defaultProps = {
  Suspense: null
};

const LazyRender = ({
  children,
  render,
  Suspense
}: Props & typeof defaultProps) => {
  const [Seen, setSeen] = useState<boolean>(false);

  useEffect(() => {
    if (!Seen && render) {
      setSeen(true);
    }
  }, [render, Seen]);

  return Seen ? children : Suspense;
};

export default memo(LazyRender);
