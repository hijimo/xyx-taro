import React, { FC } from "react";
import { View, Image } from "@tarojs/components";
import classNames from "classnames";
import Coupon, { CouponTypeEnum } from "./Coupon";
import WingBlank from "@/components/WingBlank";
import useJsonImage from "@/pages/hooks/useJsonImage";
import type { StrategySSD } from "@/types";
import styles from "./Info.module.less";

interface InfoProps {
  data?: StrategySSD;
  className?: string;
}

const Info: FC<InfoProps> = ({ data, className }) => {
  const imgUrl = useJsonImage(data?.filesJson);
  return (
    <View className={classNames(styles.info, className)}>
      <Image src={imgUrl} className={styles.img} />
      <WingBlank size="xxxl">
        <Coupon
          couponJson={data?.rewardText}
          type={CouponTypeEnum.GOLD}
          className={styles.coupon1}
        />
        <Coupon
          couponJson={data?.finalRewardText}
          type={CouponTypeEnum.FINAL}
          className={styles.coupon2}
        />
      </WingBlank>
    </View>
  );
};

export default React.memo(Info) as typeof Info;
