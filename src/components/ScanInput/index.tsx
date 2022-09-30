import React, { FC } from "react";
import { View, Input } from "@tarojs/components";
import classNames from "classnames";
import { InputProps } from "@tarojs/components/types/Input";
import Icon from "@/components/Icon";
import styles from "./index.module.less";

export interface ScanInputProps extends InputProps {
  style?: React.CSSProperties;
  className?: string;
}

const ScanInput: FC<ScanInputProps> = ({ style, className, ...InputProps }) => {
  return (
    <View className={classNames(styles.scanItem, className)} style={style}>
      <Input className={styles.input} {...InputProps} />
      <Icon value="scan" className={styles.icon} size={20} />
    </View>
  );
};

export default React.memo(ScanInput) as typeof ScanInput;
