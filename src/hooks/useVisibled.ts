import { useState, useEffect } from 'react';

const useVisibled = (visible: boolean) => {
  const [visibled, setVisibled] = useState(visible);

  useEffect(() => {
    if (!visibled && visible) {
      setVisibled(true);
    }
  }, [visible]);

  return visibled;
};

export default useVisibled;