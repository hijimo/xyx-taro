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
import Reward from "./components/Reward";
import Info from "./components/Info";

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
      <Reward data={data?.gameReward} />
      <Info data={data?.gameReward} />
      <View className={styles.buttonBar}>
        <Button className={classNames(styles.button, styles.cancel)}>
          放弃
        </Button>
        <Button className={classNames(styles.button)}>终极宝箱</Button>
      </View>
    </View>
  );
};
export default Index;
