import React, { FC, useCallback } from "react";
import _isFunction from "lodash/isFunction";
import _get from "lodash/get";
import classNames from "classnames";
import { pxTransform } from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./QuickList.module.less";

export interface QuickListProps<T> {
  dataSource: Array<T>;
  renderItem: (item: T, index: number) => JSX.Element;
  rowKey?: string | ((item: T) => string);
  column?: 1 | 2 | 3 | 4;
  gutter?: number;
  className?: string;
}

const QuickList = <T,>({
  dataSource = [],
  renderItem,
  rowKey,
  column = 2,
  gutter = 16,
  className,
}: QuickListProps<T>) => {
  const generateKey = useCallback(
    (d: T, i: number) => {
      if (rowKey === undefined || rowKey === null) {
        return i;
      } else if (_isFunction(rowKey)) {
        return rowKey(d);
      }
      return _get(d, rowKey) as string;
    },
    [rowKey]
  );

  const itemWidth = 100 / column;
  const halfGutter = gutter / 2;

  return (
    <View
      className={classNames(styles.list, className)}
      style={{ margin: `0 ${pxTransform(-halfGutter)}` }}
    >
      {dataSource.map((d, i) => (
        <View
          style={{
            width: `${itemWidth}%`,
            marginBottom: pxTransform(gutter),
            padding: `0 ${pxTransform(halfGutter)}`,
          }}
          key={generateKey(d, i)}
          className={styles.item}
        >
          {renderItem(d, i)}
        </View>
      ))}
    </View>
  );
};

export default React.memo(QuickList) as typeof QuickList;
