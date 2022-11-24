import React, { useMemo, useImperativeHandle } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useReachBottom } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Loading from "@/components/Loading";
import QuickList from "@/components/QuickList";
import type { QuickListProps } from "@/components/QuickList";
import type { ResponseData, PaginationData } from "@/types";
import type { QueryFunction } from "react-query/types";
import styles from "./index.module.less";

export interface RefInfiniteQueriesListProps {
  refetch: () => void;
}
interface InfiniteQueriesListProps<T>
  extends Omit<QuickListProps<T>, "dataSource"> {
  // 额外的查询条件
  getExtraParams?: () => any;

  emptyView?: () => JSX.Element;
  queryKey: string | string[];
  api: (params: any) => Promise<ResponseData<PaginationData<T[]>>>;
}

function InteralInfiniteQueriesList<T>(
  {
    queryKey,
    emptyView,
    getExtraParams,
    api,

    renderItem,
    ...props
  }: InfiniteQueriesListProps<T>,
  ref: React.Ref<RefInfiniteQueriesListProps>
) {
  const queryClient = useQueryClient();

  const queryFn: QueryFunction<any, string> = (params) => {
    const extraParams = getExtraParams?.();
    console.log("params", params);
    return api({
      pageNo: params.pageParam || 1,
      pageNum: params.pageParam || 1,
      ...extraParams,
    });
  };
  const {
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage) => {
      const { pageNo, records, pageSize } = lastPage.data;
      if (records.length >= pageSize) {
        return pageNo + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const { pageNo } = firstPage.data;
      if (pageNo > 1) return pageNo - 1;
      return undefined;
    },
  });

  useImperativeHandle(ref, () => ({
    refetch: () => {
      // 重新加载数据的时候，重置状态为初始
      queryClient.resetQueries(queryKey);
      refetch({
        active: false,
        refetchPage: (page, index) => index === 0,
      });
    },
  }));

  const listData = useMemo(() => {
    return data?.pages.map((it) => it.data.records).flat() || [];
  }, [data]);

  const loadingText = useMemo(() => {
    if (isFetching && !isFetchingNextPage) {
      return "加载中";
    } else if (isFetchingNextPage) {
      return "正在加载";
    }
    return "加载中";
  }, [isFetching, isFetchingNextPage]);

  useReachBottom(() => {
    fetchNextPage();
  });

  return (
    <View className={styles.infiniteQueriesList}>
      <QuickList
        {...props}
        column={1}
        dataSource={listData}
        renderItem={renderItem}
      />
      {!isFetching &&
        !isFetchingNextPage &&
        (!listData || listData.length === 0) &&
        emptyView?.()}
      {(isFetching || isFetchingNextPage) && <Loading text={loadingText} />}
      {hasNextPage === false && (
        <View className={styles.ended}>没有更多数据了</View>
      )}
    </View>
  );
}

const InfiniteQueriesList = React.forwardRef(InteralInfiniteQueriesList) as (
  props: InfiniteQueriesListProps<T> & {
    ref?: React.Ref<RefInfiniteQueriesListProps>;
  }
) => React.ReactElement;

export default InfiniteQueriesList;
