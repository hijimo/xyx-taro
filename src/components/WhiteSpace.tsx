import React, { FC } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import styles from "./WhiteSpace.module.less";

export interface WhiteSpaceProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
  className?: string;
  style?: React.CSSProperties;
}

const WhiteSpace: FC<WhiteSpaceProps> = ({ size = "lg", className, style }) => {
  const wrapCls = classNames(styles.whitespace, styles[size], className);
  return <View className={wrapCls} style={style}></View>;
};

export default WhiteSpace;
