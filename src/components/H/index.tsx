import React from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import styles from "./index.module.less";

interface HProps {
  size?: "h1" | "h2" | "h3" | "h4" | "h5";
  extra?: React.ReactElement;
  className?: string;
}

const H: React.FC<HProps> = ({ size = "h3", extra, className, children }) => {
  return (
    <View className={classNames(styles.h, styles[size], className)}>
      {children}
      {extra
        ? React.cloneElement(extra, {
            className: classNames(extra.props.className, styles.extra),
          })
        : null}
    </View>
  );
};

export default React.memo(H) as typeof H;
