import React, { useRef, useCallback } from "react";
import { View, Button, Text } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
import { NoticeBar } from "@nutui/nutui-react-taro";
import { useQuery } from "react-query";
import WingBlank from "@/components/WingBlank";
import InfiniteQueriesList from "@/components/InfiniteQueriesList";
import type { RefInfiniteQueriesListProps } from "@/components/InfiniteQueriesList";
import Empty from "@/components/Empty";
import AdventureItem from "@/components/ListItem/AdventureItem";
import { getStrategyList } from "@/services/strategy";
import { getBannerList } from "@/services/banner";
import Banner from "./components/Banner";

import styles from "./index.module.less";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const infiniteListRef = useRef<RefInfiniteQueriesListProps>(null);

  const { data } = useQuery(
    ["getBannerList"],
    () => getBannerList({ pageNo: 1, pageSize: 20 }),
    {
      select: (d) => d.data.records,
    }
  );

  const handleRouteAdventure = useCallback((it) => {
    navigateTo({
      url: `/pages/adventure/detail/index?strategyId=${it.strategyId}`,
    });
  }, []);

  return (
    <View className={styles.index}>
      <NoticeBar
        text="通知：受台风天气影响，请各位游客注意安全"
        leftIcon="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
        closeMode
        className={styles.notice}
      />
      <WingBlank size="xxxxl">
        <Banner data={data} />
        <View className={styles.title}>探秘路线</View>

        <InfiniteQueriesList
          ref={infiniteListRef}
          gutter={40}
          getExtraParams={() => ({ pageSize: 20 })}
          emptyView={() => <Empty remark="没有冒险" buttonVisible={false} />}
          api={getStrategyList}
          queryKey="getDeviceList"
          renderItem={(it) => (
            <AdventureItem
              onClick={() => {
                handleRouteAdventure(it);
              }}
              data={it}
            />
          )}
        />
      </WingBlank>
      {/* <View className={styles.header}>
        <Image src={companyIcon} className={styles.img} />

        {userInfo?.nickName || "--"}
      </View> */}
    </View>
  );
};
// s
export default Index;
