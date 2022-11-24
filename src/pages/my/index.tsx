import React from "react";
import { useDispatch } from "react-redux";
import {
  usePullDownRefresh,
  stopPullDownRefresh,
  useDidShow,
} from "@tarojs/taro";
import { View } from "@tarojs/components";
import { fetchCurrent } from "@/redux/actions/user";
import UserInfo from "./components/UserInfo";
import styles from "./index.module.less";

interface MyProps {}

// 缓存currentUesr的过程
// 在props或state 更新时也不会再去计算currentUser
// 只有在 redux状态更新才会更新计算

const My: React.FC<MyProps> = () => {
  const dispatch = useDispatch();

  useDidShow(() => {
    fetchCurrent();
  });

  usePullDownRefresh(async () => {
    await Promise.all([dispatch(fetchCurrent())]);
    stopPullDownRefresh();
  });

  return (
    <View className={styles.index}>
      <UserInfo />
    </View>
  );
};

export default My;
