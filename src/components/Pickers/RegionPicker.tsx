import React, { useCallback, useState } from "react";
import _last from "lodash/last";
import { View, Picker } from "@tarojs/components";
import type { PickerRegionProps } from "@tarojs/components/types/Picker";
import type { CommonEventFunction } from "@tarojs/components/types/common";
import styles from "./RegionPicker.module.less";

export interface RegionPickerProps extends Omit<PickerRegionProps, "mode"> {}

const RegionPicker: React.FC<RegionPickerProps> = ({
  onChange,
  ...fieldProps
}) => {
  const [displayText, setDisplayText] = useState<string>(
    _last(fieldProps.value) || "全部"
  );

  console.log("fieldProps", fieldProps);
  const handleRegionChange: CommonEventFunction<PickerRegionProps.ChangeEventDetail> =
    useCallback((e) => {
      const { value } = e.detail;
      setDisplayText(value.pop() || "全部");
      onChange?.(e);
    }, []);
  return (
    <Picker
      {...fieldProps}
      mode="region"
      level="city"
      onChange={handleRegionChange}
    >
      <View className={styles.display}>{displayText}</View>
    </Picker>
  );
};

export default RegionPicker;
