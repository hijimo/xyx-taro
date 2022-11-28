import React from "react";
import { View } from "@tarojs/components";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";

import _get from "lodash/get";
import _fromPairs from "lodash/fromPairs";
import { useQuery } from "react-query";
import { getGameInfo } from "@/services/game";
import Reward from "./components/Reward";

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
    </View>
  );
};
export default Index;
