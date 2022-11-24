import React, { useMemo } from "react";
import classNames from "classnames";
import { View, Image, Button } from "@tarojs/components";
import _get from "lodash/get";
import { StrategySSD } from "@/types";
import useJsonImage from "@/pages/hooks/useJsonImage";
import { BooleanEnum, AdventureStatusDesc } from "@/enums";
import styles from "./index.module.less";

export interface AdventureItemProps {
  className?: string;
  data: StrategySSD;
  onClick?: (item) => void;
  style?: React.CSSProperties;
}

const AdventureItem: React.FC<AdventureItemProps> = ({
  className,
  data,
  style,
  ...props
}) => {
  const imgUrl = useJsonImage(data?.filesJson);

  return (
    <View
      className={classNames(styles.adventureItem, className)}
      style={style}
      {...props}
    >
      <Image lazyLoad src={imgUrl} className={styles.img} />
      <View
        className={classNames(styles.status, {
          [styles.disabled]: data.strategyStatus === BooleanEnum.TRUE,
        })}
      >
        {AdventureStatusDesc[data.strategyStatus] || ""}
      </View>
      <View className={styles.info}>
        <View className={styles.title}>{data?.strategyName}</View>
        <View className={styles.text}>{data?.strategyBackground}</View>
        <View className={styles.progress}>
          <View className={styles.progressBar}>
            <View className={styles.progressCurrent} style={{ width: "30%" }} />
          </View>
          <View className={styles.progressText}>
            已报名：{data?.playerCount || 0}人
          </View>
        </View>
        <Button
          disabled={data?.strategyStatus === BooleanEnum.TRUE}
          className={styles.button}
        >
          立即参与
        </Button>
      </View>
    </View>
  );
};

export default React.memo(AdventureItem);
