import React, { FC, useMemo } from "react";
import { View, Image } from "@tarojs/components";

import classNames from "classnames";
import type { ChapterSSD } from "@/types";
import s1 from "@/assets/s1.png";
import s2 from "@/assets/s2.png";
import styles from "./Status.module.less";

interface StatusProps {
  data?: ChapterSSD;
  className?: string;
}

const Status: FC<StatusProps> = ({ data, className }) => {
  const isSuccess = useMemo(() => {
    const total = 100 * data?.gameChapter.length;

    const current = data?.gameChapter?.reduce((p, n) => {
      return p + n.chapterStatus;
    }, 0);
    return total === current && data?.gameChapter?.length > 0;
  }, [data]);

  return (
    <View className={classNames(styles.status, className)}>
      <Image src={isSuccess ? s1 : s2} className={styles.img} />
    </View>
  );
};

export default React.memo(Status) as typeof Status;
