import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import styles from "./index.module.less";

export interface CardProps {
  className?: string;
  bodyCls?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  footerContent?: React.ReactNode;
  footerExtra?: React.ReactNode;
  renderHeader?: React.ReactNode | (() => React.ReactNode) | null;
  renderFooter?: React.ReactNode | (() => React.ReactNode) | null;
  hasHeader?: boolean;
  hasFooter?: boolean;
  full?: boolean;
}

const Card: React.FC<CardProps> = ({
  className,
  bodyCls,
  style,
  children,
  title,
  extra,
  footerContent,
  footerExtra,
  renderHeader,
  renderFooter,
  full = false,
}) => {
  const wrapClass = classNames(
    styles.card,
    {
      [styles.full]: full,
    },
    className
  );

  const getHeader = () => {
    if (renderHeader === undefined) {
      return <CardHeader title={title} extra={extra} />;
    }
    if (typeof renderHeader === "function") {
      return renderHeader();
    }
    return renderHeader;
  };

  const getFooter = () => {
    if (renderFooter === undefined) {
      return <CardFooter content={footerContent} extra={footerExtra} />;
    }
    if (typeof renderFooter === "function") {
      return renderFooter();
    }
    return renderFooter;
  };

  return (
    <View className={wrapClass} style={style}>
      {renderHeader !== null && (
        <View className={styles.header}>{getHeader()}</View>
      )}

      <View className={classNames(styles.body, bodyCls)}>{children}</View>
      {renderFooter !== null && (
        <View className={styles.footer}>{getFooter()}</View>
      )}
    </View>
  );
};

export default React.memo(Card) as typeof Card;
