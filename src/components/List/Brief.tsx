import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import styles from "./List.module.less";

export interface BriefProps {
  className?: string;
  role?: string;
  style?: React.CSSProperties;
}

const Brief: React.FC<BriefProps> = ({ className, style, children }) => {
  return (
    <View className={classNames(styles.brief, className)} style={style}>
      {children}
    </View>
  );
};

export default Brief;
