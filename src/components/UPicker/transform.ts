import _get from 'lodash/get';
export const multiSelectorWxValue2Value = (
  wxValues: number[],
  options: any[],
  valueKey: string
) => {
  return wxValues?.map((v, idx: number) => {
    if (v === undefined) return undefined;
    return _get(options, `[${idx}][${v}][${valueKey}]`);
  });
};

export const multiSelectorValue2Wxvalue = (
  values: number[],
  options,
  valueKey: string
) => {
  return values?.map((v, idx: number) => {
    if (v === undefined) return undefined;
    return _get(
      options[idx]?.find((it) => it[valueKey] === v),
      valueKey
    );
  });
};

export const getWxValuesByRange = (
  values: number[],
  range: any,
  valueKey: string
) => {
  let r = range;
  return values?.map((v) => {
    const idx = r.findIndex((it) => it[valueKey] === v);
    if (idx >= 0) {
      r = r[idx].children || [];

      return idx;
    }
    return undefined;
  });
};
export const multiSelectorDataTransform = (
  range: any[],
  maxLength: number,
  values?: number[]
) => {
  if (!range || !Array.isArray(range) || !range.length) {
    return [];
  }
  let ary = [];
  let b = range;
  let i = 0;

  while (b !== undefined && i < maxLength) {
    ary.push(b);

    if (
      values === undefined ||
      (values[i] === undefined && _get(b, '[0]') !== undefined)
    ) {
      b = b[0]?.children || [];
    } else if (values[i] === undefined) {
      b = [];
    } else if (values[i] !== undefined) {
      b = _get(b, `[${values[i]}].children`) || [];
    }

    i++;
  }
  return JSON.parse(JSON.stringify(ary));
};
