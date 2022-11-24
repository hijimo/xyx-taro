import React from "react";
import classNames from "classnames";
import { View, Image } from "@tarojs/components";
import styles from "./Avatar.module.less";

export interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ className, src, style, ...props }) => {
  return (
    <View
      className={classNames(styles.avatar, className)}
      style={style}
      {...props}
    >
      <Image lazyLoad src={src} className={styles.img} />
    </View>
  );
};

export default Avatar;
