import { useMemo } from "react";
import _get from "lodash/get";

interface UseJsonImageOption {
  index?: number;
}

const useJsonImage = (jsonStr: string, opts?: UseJsonImageOption) => {
  const src = useMemo(() => {
    if (!jsonStr) return "";
    const { index = 0 } = opts || {};
    return _get(JSON.parse(jsonStr), `[${index}].url`);
  }, [jsonStr, opts]);

  return src;
};

export default useJsonImage;
