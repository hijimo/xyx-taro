import React, { FC } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { isIphoneX } from "@/utils/systemInfo";
import styles from "./index.module.less";

interface AdaptContainerProps {
  style?: React.CSSProperties;
  className?: string;
}

const AdaptContainer: FC<AdaptContainerProps> = React.memo(
  ({ style, children, className }) => {
    return (
      <View
        className={classNames(
          styles.container,
          isIphoneX ? styles.iphoneX : null,
          className
        )}
        style={style}
      >
        {children}
      </View>
    );
  }
);

export default AdaptContainer;
