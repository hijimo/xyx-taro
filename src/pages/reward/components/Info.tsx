import React, { FC, useMemo } from "react";
import { View, Image, Text } from "@tarojs/components";
import classNames from "classnames";
import _get from "lodash/get";
import styles from "./Info.module.less";

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
    <View className={classNames(styles.info, className)}>
      <View className={styles.row}>
        <Text className={styles.strong}>奖品：</Text>
        {reward?.remark}
      </View>
      <Image src={_get(reward, "image[0].url")} className={styles.img} />
      <View className={styles.row}>
        <Text className={styles.strong}>价值：</Text>
        <Text className={styles.money}>￥{reward?.price}</Text>元
      </View>
      <View className={styles.row}>
        <Text className={styles.strong}>线索：</Text>
        <Text className={classNames(styles.money, styles.strong)}>
          {data?.clue}
        </Text>
      </View>
      <View className={classNames(styles.strong, styles.row)}>说明：</View>
      <View className={styles.text}>
        1.终极大宝藏需要从各角色索取的线索中，合作解密；
      </View>
      <View className={styles.text}>
        2.每人都有三次开启宝箱密码的机会，奖项归第一个 成功开启人所有。
      </View>
    </View>
  );
};

export default React.memo(Status) as typeof Status;
