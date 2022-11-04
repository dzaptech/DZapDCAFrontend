import React from 'react';
import { useMediaQuery } from 'react-responsive';

export function Mobile({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement | null {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? children : null;
}
export function Desktop({
  children,
  size,
}: {
  children: React.ReactElement;
  size?: number;
}): React.ReactElement | null {
  const isMobile = useMediaQuery({ minWidth: size });
  return isMobile ? children : null;
}
Desktop.defaultProps = {
  size: 769,
};

export const minWidth = 767;
