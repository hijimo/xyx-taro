import React, { FC, useMemo } from "react";
import { View, Image, Text } from "@tarojs/components";
import _get from "lodash/get";
import classNames from "classnames";
import styles from "./Coupon.module.less";

export enum CouponTypeEnum {
  GOLD = 1,
  FINAL = 2,
}
const CouponTypeEnumDesc = {
  [CouponTypeEnum.GOLD]: "黄金宝箱",
  [CouponTypeEnum.FINAL]: "终极宝箱",
};
const CouponTypeEnumDesc2 = {
  [CouponTypeEnum.GOLD]: ["完成打卡任务", "领现金大礼包"],

  [CouponTypeEnum.FINAL]: ["凑齐钥匙开箱", "领现金大礼包"],
};
interface CouponProps {
  type?: CouponTypeEnum;
  couponJson?: string;
  text?: string;
  className?: string;
}

const Coupon: FC<CouponProps> = ({
  className,
  couponJson,
  type = CouponTypeEnum.GOLD,
}) => {
  const title = useMemo(() => {
    return CouponTypeEnumDesc[type];
  }, [type]);
  const desc = useMemo(() => {
    return CouponTypeEnumDesc2[type];
  }, [type]);

  const data = useMemo(() => {
    return JSON.parse(couponJson || "{}");
  }, [couponJson]);

  return (
    <View
      className={classNames(styles.coupon, className, {
        [styles.final]: type === CouponTypeEnum.FINAL,
      })}
    >
      <View className={styles.title}>{title}</View>
      <View className={styles.container}>
        <View className={styles.content}>
          <View className={styles.price}>
            <Text className={styles.symbol}>￥</Text>
            {data?.price || "--"}
          </View>
          <View className={styles.split} />
          <View className={styles.text}>
            {desc.map((it: string) => (
              <View key={it}>{it}</View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Coupon) as typeof Coupon;
