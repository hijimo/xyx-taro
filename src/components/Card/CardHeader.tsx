import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import styles from "./CardHeader.module.less";

export interface CardHeaderProps {
  className?: string;
  thumb?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  thumb,
  title,
  extra,
}) => {
  return (
    <View className={classNames(styles.cardHeader, className)}>
      <View className={styles.thumb}>{thumb}</View>
      <View className={styles.title}>{title}</View>
      <View className={styles.extra}>{extra}</View>
    </View>
  );
};

export default React.memo(CardHeader) as typeof CardHeader;
