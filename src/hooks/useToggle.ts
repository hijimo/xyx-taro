import { useState, useCallback } from 'react';

const useToggle = (initial = false) => {
  const [on, setToggle] = useState(initial);
  const toggle = useCallback(() => setToggle(prev => !prev), []);
  const reset = useCallback(() => setToggle(initial), []);

  return {
    on,
    set: setToggle,
    reset,
    toggle,
  };
};

export default useToggle;
