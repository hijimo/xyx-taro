import React from "react";
import classNames from "classnames";
import { Text } from "@tarojs/components";
import { pxTransform } from "@tarojs/taro";
import type { ITouchEvent } from "@tarojs/components/types/common";
interface IconProps {
  style?: React.CSSProperties;
  prefixClass?: string;
  value?: string;
  color?: string;
  size?: number | string;
  className?: string;
  onClick?: (event: ITouchEvent) => void;
}

const Icon: React.FC<IconProps> = ({
  prefixClass = "icon",
  className,
  value,
  color,
  style,
  size = 20,
  onClick,
}) => {
  const rootStyle = {
    fontSize: `${pxTransform(parseInt(String(size)) * 2)}`,
    color,
  };

  const iconName = value ? `${prefixClass}-${value}` : "";
  return (
    <Text
      className={classNames(prefixClass, iconName, className)}
      style={{
        ...rootStyle,
        ...style,
      }}
      onClick={onClick}
    ></Text>
  );
};

export default Icon;
