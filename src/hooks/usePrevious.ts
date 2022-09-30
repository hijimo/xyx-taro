import { useRef, useEffect } from 'react';

const usePrevious = (value: any) => {
  const ref = useRef<any>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
