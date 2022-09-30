import React, { useCallback, useState } from "react";
import { View, Picker } from "@tarojs/components";
import type { PickerSelectorProps } from "@tarojs/components/types/Picker";
import type { CommonEventFunction } from "@tarojs/components/types/common";
import styles from "./TimeRangePicker.module.less";

export interface TimeRangePickerProps
  extends Omit<PickerSelectorProps, "mode"> {}

const format = (num: number) => {
  if (num < 10) return `0${num}`;
  return `${num}`;
};

const range = new Array(24).fill(1).map((it, idx) => ({
  name: `${format(idx)} : 00 ~ ${format(idx + 1)} : 00`,
  value: [`${format(idx)}:00`, `${format(idx + 1)}:00`],
}));
const getDisplayByValue = (value) =>
  range.find((it) => it.value === value)?.name || "";
const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  onChange,
  ...fieldProps
}) => {
  const [displayText, setDisplayText] = useState<string>(
    getDisplayByValue(fieldProps.value) || "全部"
  );

  const handleDateChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> =
    useCallback((e) => {
      const { value } = e.detail;
      setDisplayText(range[value].name || "全部");
      onChange?.(range[value].value);
    }, []);
  return (
    <Picker
      {...fieldProps}
      mode="selector"
      onChange={handleDateChange}
      range={range}
      rangeKey="name"
    >
      <View className={styles.display}>{displayText}</View>
    </Picker>
  );
};

export default TimeRangePicker;
