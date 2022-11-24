import React, { FC, useMemo } from "react";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import classNames from "classnames";
import type { ChapterSSD } from "@/types";
import styles from "./Introduction.module.less";

interface IntroductionProps {
  data?: ChapterSSD;
  className?: string;
}

const Introduction: FC<IntroductionProps> = ({ data, className }) => {
  const imgList = useMemo(() => {
    if (data?.filesJson) {
      try {
        return JSON.parse(data?.filesJson);
      } catch {
        return [];
      }
    }
    return [];
  }, [data]);
  return (
    <View className={classNames(styles.introduction, className)}>
      <View className={styles.title}>介绍</View>
      <Swiper className={styles.swiper} autoplay>
        {imgList?.map((it, idx) => (
          <SwiperItem key={idx} className={styles.swiperItem}>
            <Image src={it.url} className={styles.bannerImage} />
          </SwiperItem>
        ))}
      </Swiper>
      <View className={styles.info}>
        <View className={styles.tips}>线索</View>
        {/* <View className={styles.name}>{data?.chapterTitle}</View> */}
        <View className={styles.desc}>{data?.chapterBackground}</View>
      </View>
    </View>
  );
};

export default React.memo(Introduction) as typeof Introduction;
