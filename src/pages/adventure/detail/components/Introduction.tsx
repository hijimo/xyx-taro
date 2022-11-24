import React, { FC } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import styles from "./Introduction.module.less";

interface IntroductionProps {
  text?: string;
  className?: string;
}

const Introduction: FC<IntroductionProps> = ({ text, className }) => {
  return (
    <View className={classNames(styles.introduction, className)}>
      <View className={styles.title}>故事背景</View>
      <View className={styles.text}>{text}</View>
    </View>
  );
};

export default React.memo(Introduction) as typeof Introduction;
