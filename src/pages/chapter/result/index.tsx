import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import { View, Button } from "@tarojs/components";
import {
  navigateTo,
  useRouter,
  setNavigationBarTitle,
  showToast,
  showModal,
} from "@tarojs/taro";
import nzh from "nzh/dist/nzh.cn";
import classNames from "classnames";
import _get from "lodash/get";
import _fromPairs from "lodash/fromPairs";
import { useQuery, useMutation } from "react-query";
import { getGameInfo, validGame } from "@/services/game";
import Status from "./components/Status";
import ProgressCard from "./components/ProgressCard";

import styles from "./index.module.less";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { gameId } = useRouter()?.params || {};

  const { data } = useQuery(
    ["getGameInfo", [gameId]],
    () => getGameInfo(gameId!),
    {
      select: (d) => d.data,
      onSuccess: (d) => {
        setNavigationBarTitle({
          title: d.strategyName,
        });
      },
    }
  );

  return (
    <View className={styles.index}>
      <View className={styles.title}>{data?.strategyName || " "}</View>
      <ProgressCard className={styles.progress} data={data} />
      <Status data={data} className={styles.status} />
    </View>
  );
};
export default Index;
