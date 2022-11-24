import React, { useRef, useCallback } from "react";
import { View, Button, Text } from "@tarojs/components";
import { navigateTo, useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useQuery } from "react-query";
import { getStrategyInfo } from "@/services/strategy";
import Info from "./components/Info";
import Introduction from "./components/Introduction";

import styles from "./index.module.less";
import { BooleanEnum } from "@/enums";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { strategyId } = useRouter()?.params || {};
  const { data } = useQuery(
    ["getStrategyInfo"],
    () => getStrategyInfo(strategyId!),
    {
      select: (d) => d.data,
      enabled: !!strategyId,
      onSuccess: (d) => {
        setNavigationBarTitle({
          title: d.strategyName,
        });
      },
    }
  );

  return (
    <View className={styles.index}>
      <Info data={data} />
      <Introduction
        text={data?.strategyBackground}
        className={styles.introduction}
      />
      <Button
        disabled={data?.strategyStatus === BooleanEnum.TRUE}
        className={styles.button}
      >
        神秘之旅
      </Button>
    </View>
  );
};

export default Index;
