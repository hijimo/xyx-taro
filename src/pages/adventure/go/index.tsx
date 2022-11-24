import React, { useRef, useCallback } from "react";
import { View, Button, Text } from "@tarojs/components";
import { navigateTo, useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useQuery } from "react-query";
import { getStrategyInfo } from "@/services/strategy";
import RoleForm from "./components/RoleForm";
import styles from "./index.module.less";

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
      <RoleForm strategyId={strategyId} data={data?.gameRoles} />
    </View>
  );
};

export default Index;
