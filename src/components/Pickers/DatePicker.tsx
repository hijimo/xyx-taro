import React, { useCallback, useState } from "react";
import { View, Picker } from "@tarojs/components";
import type { PickerDateProps } from "@tarojs/components/types/Picker";
import type { CommonEventFunction } from "@tarojs/components/types/common";
import styles from "./DatePicker.module.less";

export interface DatePickerProps extends Omit<PickerDateProps, "mode"> {}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, ...fieldProps }) => {
  const [displayText, setDisplayText] = useState<string>(
    fieldProps.value || "全部"
  );

  const handleDateChange: CommonEventFunction<PickerDateProps.ChangeEventDetail> =
    useCallback((e) => {
      const { value } = e.detail;
      setDisplayText(value || "全部");
      onChange?.(e);
    }, []);
  return (
    <Picker {...fieldProps} mode="date" onChange={handleDateChange}>
      <View className={styles.display}>{displayText}</View>
    </Picker>
  );
};

export default DatePicker;
