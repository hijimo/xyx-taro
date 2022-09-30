import React, { FC } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import styles from "./List.module.less";

export interface ListProps {
  className?: string;
  role?: string;
  style?: React.CSSProperties;
  renderHeader?: (() => React.ReactNode) | React.ReactNode;
  renderFooter?: (() => React.ReactNode) | React.ReactNode;
}

const List: FC<ListProps> = ({
  className,
  style,
  children,
  renderHeader,
  renderFooter,
  ...otherProps
}) => {
  const wrapCls = classNames(styles.list, className);

  return (
    <View className={wrapCls} style={style} {...otherProps}>
      {renderHeader ? (
        <View className={styles.header}>
          {typeof renderHeader === "function" ? renderHeader() : renderHeader}
        </View>
      ) : null}
      {children ? <View className={styles.body}>{children}</View> : null}
      {renderFooter ? (
        <View className={styles.footer}>
          {typeof renderFooter === "function" ? renderFooter() : renderFooter}
        </View>
      ) : null}
    </View>
  );
};

export default List;
