import React, { FC, useMemo } from "react";
import { View, Image } from "@tarojs/components";
import { Steps, Step } from "@nutui/nutui-react-taro";

import classNames from "classnames";
import useJsonImage from "@/pages/hooks/useJsonImage";
import type { ChapterSSD } from "@/types";
import { ChapterStatusEnumDes } from "@/enums";
import styles from "./ProgressCard.module.less";

interface ProgressCardProps {
  data?: ChapterSSD;
  className?: string;
}

const ProgressCard: FC<ProgressCardProps> = ({ data, className }) => {
  const role = useMemo(() => {
    return data?.gameRole;
  }, [data]);
  return (
    <View className={classNames(styles.progressCard, className)}>
      <View className={styles.userInfo}>
        <Image src={role?.avatar} className={styles.img} />
        <View className={styles.info}>
          <View className={styles.text}>角色：{data?.playerName}</View>
          <View className={styles.text}>身份：{role?.gameRoleName}</View>
        </View>
      </View>
      <View className={styles.title}>任务进度</View>
      <Steps current={3} direction="vertical">
        {data?.gameChapter?.map((it, idx) => (
          <Step
            activeIndex={idx + 1}
            title={ChapterStatusEnumDes[it.chapterStatus]}
            content={it.chapterTitle}
          >
            {idx + 1}
          </Step>
        ))}
      </Steps>
    </View>
  );
};

export default React.memo(ProgressCard) as typeof ProgressCard;
