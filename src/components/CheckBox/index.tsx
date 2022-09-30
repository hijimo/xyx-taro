import React, { FC } from "react";
import { Checkbox } from "@tarojs/components";
import { CheckboxProps } from "@tarojs/components/types/Checkbox";
import classNames from "classnames";
import styles from "./index.module.less";

const CheckBoxStyle: FC<CheckboxProps> = ({
  className,
  ...otherProps
}: any) => {
  return (
    <Checkbox
      className={classNames(styles.checkbox, className)}
      {...otherProps}
    />
  );
};

export default CheckBoxStyle;
