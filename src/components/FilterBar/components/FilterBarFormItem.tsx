import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { Field } from "rc-field-form";
import type { FieldProps } from "rc-field-form/es/Field";
import styles from "./FilterBarFormItem.module.less";

export interface FilterBarFormItemProps extends FieldProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  labelBold?: boolean;
  direction?: "vertical" | "horizontal";
}

const FilterBarFormItem: React.FC<FilterBarFormItemProps> = ({
  className,
  style,
  label,
  labelBold = false,
  children,
  direction = "horizontal",
  ...fieldProps
}) => {
  return (
    <View
      className={classNames(
        styles.filterBarFormItem,
        className,
        styles[direction]
      )}
      style={style}
    >
      <View className={classNames(styles.label, labelBold && styles.bold)}>
        {label}
      </View>
      <View className={styles.formItemContent}>
        <Field {...fieldProps}>{children}</Field>
      </View>
    </View>
  );
};

export default FilterBarFormItem;
