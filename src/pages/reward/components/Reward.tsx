import React, { FC, useMemo } from "react";
import { View, Image, Text } from "@tarojs/components";
import classNames from "classnames";
import type { ChapterSSD } from "@/types";
import styles from "./Reward.module.less";

interface StatusProps {
  data?: any;
  className?: string;
}

const Status: FC<StatusProps> = ({ data, className }) => {
  const reward = useMemo(() => {
    if (data?.rewardText) {
      return JSON.parse(data?.rewardText);
    }
  }, [data]);

  return (
    <View className={classNames(styles.reward, className)}>
      <View className={styles.box}>
        <View className={styles.title}>恭喜</View>
        <View className={styles.tips}>
          获得<Text className={styles.money}>{reward?.price || ""}元</Text>
          现金红包
        </View>
        <View className={classNames(styles.coupon)}>
          <View className={styles.container}>
            <View className={styles.content}>
              <View className={styles.price}>
                <Text className={styles.symbol}>￥</Text>
                {reward?.price || ""}
              </View>
              <View className={styles.split} />
              <View className={styles.text}>现金红包</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Status) as typeof Status;
