import React, { FC } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import styles from "./WingBlank.module.less";

export interface WingBlankProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
  className?: string;
  style?: React.CSSProperties;
}

const WingBlank: FC<WingBlankProps> = ({
  size = "lg",
  className,
  style,
  children,
}) => {
  const wrapCls = classNames(styles.wingblank, styles[size], className);
  return (
    <View className={wrapCls} style={style}>
      {children}
    </View>
  );
};

export default WingBlank;
