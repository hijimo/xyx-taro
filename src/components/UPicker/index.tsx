// 商家信息
import React, { FC, useState, useEffect, useMemo } from 'react';
import { Picker } from '@tarojs/components';
import { produce } from 'immer';
import {
  PickerSelectorProps,
  PickerMultiSelectorProps,
  CommonEventFunction,
  PickerTimeProps,
  PickerDateProps,
  PickerRegionProps,
} from '@tarojs/components/types/Picker';
import _get from 'lodash/get';
import _last from 'lodash/last';
import {
  multiSelectorValue2Wxvalue,
  multiSelectorWxValue2Value,
  getWxValuesByRange,
  multiSelectorDataTransform,
} from './transform';

interface UPickerProps
  extends FC<
    | PickerSelectorProps
    | PickerMultiSelectorProps
    | PickerTimeProps
    | PickerDateProps
    | PickerRegionProps
  > {
  onChange?: (v: any) => void;
  rangeValueKey: string;
  maxLength?: number;
}

const UPicker: UPickerProps = ({
  style,
  className,
  value,
  rangeValueKey,
  maxLength = 3,
  onChange,
  range,
  ...otherProps
}) => {
  const [displayValue, setDispalyValue] = useState<string>('');
  const [pickerValue, setPickerValue] = useState<any>(undefined);

  const options = useMemo(() => {
    if (otherProps.mode === 'multiSelector') {
      return multiSelectorDataTransform(range, maxLength, pickerValue);
    }
    return range;
  }, [range, pickerValue]);
  useEffect(() => {
    // 对传入的值进行转换
    const { rangeKey } = otherProps as PickerSelectorProps;
    let text;
    switch (otherProps.mode) {
      case 'selector':
        const idx = range.findIndex((it: any) => it[rangeValueKey] == value);
        if (idx >= 0) {
          setPickerValue(idx);
          setDispalyValue(range[idx][rangeKey as string]);
        }
        break;
      case 'multiSelector':
        const v = getWxValuesByRange(value, range, rangeValueKey);
        const multiSelectorData = multiSelectorDataTransform(
          range,
          maxLength,
          v
        );

        text = v
          ?.map((it: number, idx: number) =>
            _get(multiSelectorData[idx][it], rangeKey as string)
          )
          .join('/');

        if (JSON.stringify(v) !== JSON.stringify(pickerValue)) {
          setPickerValue(v);
          setDispalyValue(text);
        }
        break;
      case 'date':
        setPickerValue(value);
        setDispalyValue(value);
        break;
      case 'time':
        setPickerValue(value);
        setDispalyValue(value);
        break;
      case 'region':
        if (Array.isArray(value)) {
          setPickerValue(value);
          setDispalyValue(value?.join?.('/') || '');
        }

        break;
      default:
        setPickerValue(value);
        break;
    }
  }, [range, value]);
  const handleChange = (e) => {
    const { rangeKey } = otherProps as PickerSelectorProps;
    let text;
    let v;
    switch (otherProps.mode) {
      case 'selector':
        text = _get(
          options[parseInt(e.detail.value as string, 10)],
          rangeKey as string
        );
        v = _get(
          options[parseInt(e.detail.value as string, 10)],
          rangeValueKey as string
        );

        setDispalyValue(text);
        if (onChange) {
          onChange(v);
        }
        break;
      case 'multiSelector':
        const { value } = e.detail;
        v = multiSelectorWxValue2Value(value, options, rangeValueKey);
        text = value
          ?.map((it: number, idx: number) =>
            _get(options[idx][it], rangeKey as string)
          )
          .join('/');

        setDispalyValue(text);
        if (onChange) {
          onChange(v);
        }
        break;
      case 'region':
        const { value: regionValue, code } =
          e.detail as PickerRegionProps.onChangeEventDetail;
        setDispalyValue(_last(regionValue) as string);
        if (onChange) {
          onChange({ code, regionValue });
        }
        break;
      case 'date':
        const { value: dateValue } =
          e.detail as PickerDateProps.onChangeEventDetail;

        setDispalyValue(dateValue);

        onChange?.(e);
        break;
      case 'time':
        const { value: timeValue } = e.detail;
        setDispalyValue(timeValue);
        onChange?.(e);
        break;
      default:
        onChange?.(e);
        break;
    }
  };

  const handleColumnChange: CommonEventFunction<PickerMultiSelectorProps.onColumnChangeEvnetDetail> =
    (e) => {
      let c = e.detail.column;
      let v = e.detail.value;
      let t;
      if (pickerValue === undefined) {
        t = new Array(options.length).fill(0);
        t[c] = v;
      } else {
        t = produce(pickerValue, (draftState) => {
          let idx = c;
          draftState[idx] = v;
          idx++;
          while (idx < maxLength) {
            draftState[idx] = 0;
            idx++;
          }
        });
      }
      setPickerValue(t);
    };
  return (
    <Picker
      range={options}
      onChange={handleChange}
      value={pickerValue}
      {...otherProps}
      onColumnChange={
        otherProps.mode === 'multiSelector' ? handleColumnChange : undefined
      }
    >
      {displayValue || '请选择'}
    </Picker>
  );
};

export default UPicker;
