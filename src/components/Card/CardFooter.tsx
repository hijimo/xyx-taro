import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import styles from "./CardFooter.module.less";

export interface CardFooterProps {
  className?: string;
  content?: React.ReactNode;
  extra?: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({
  className,
  content,
  extra,
}) => {
  return (
    <View className={classNames(styles.cardFooter, className)}>
      <View className={styles.content}>{content}</View>
      <View className={styles.extra}>{extra}</View>
    </View>
  );
};

export default React.memo(CardFooter) as typeof CardFooter;
