import React, { FC } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import _sortBy from "lodash/sortBy";
import { BannerSSD } from "@/types";
import styles from "./Banner.module.less";

interface BannerProps {
  data?: BannerSSD[];
}

const Banner: FC<BannerProps> = ({ data }) => {
  return (
    <View className={styles.banner}>
      <Swiper className={styles.swiper} autoplay>
        {_sortBy(data, "bannerRank")?.map((it) => (
          <SwiperItem key={it.bannerId} className={styles.swiperItem}>
            <Image src={it.bannerPath} className={styles.bannerImage} />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};

export default React.memo(Banner) as typeof Banner;
