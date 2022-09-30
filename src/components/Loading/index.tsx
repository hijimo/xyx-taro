import React, { FC } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import styles from "./index.module.less";

interface LoadingProps {
  text: string;
  className?: string;
}

const Loading: FC<LoadingProps> = ({ className, text = "正在加载" }) => {
  return (
    <View className={classNames(styles.loading, className)}>
      {text}
      <View className={styles.animate}>
        <View className={styles.span}>...</View>
      </View>
    </View>
  );
};

export default React.memo(Loading) as typeof Loading;
