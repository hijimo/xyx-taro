import React, { FC } from "react";
import classNames from "classnames";
import { View, Image } from "@tarojs/components";
import { ITouchEvent } from "@tarojs/components/types";
import Icon from "@/components/Icon";
import styles from "./List.module.less";

export interface ListItemProps {
  className?: string;
  hoverClass?: string;
  role?: string;
  style?: React.CSSProperties;
  onClick?: (event: ITouchEvent) => void;
  align?: "top" | "middle" | "bottom";
  mainSide?: "left" | "right";
  disabled?: boolean;
  multipleLine?: boolean;
  thumb?: React.ReactNode | null;
  icon?: string;
  extra?: React.ReactNode;
  layout?: "horizontal" | "vertical";
  arrow?: "horizontal" | "down" | "up" | "empty" | "";
  wrap?: boolean;
  error?: boolean;
  gray?: boolean;
  platform?: "android" | "ios";
}

const ListItem: FC<ListItemProps> = ({
  className,
  hoverClass,
  error = false,
  gray = false,
  style,
  children,
  align = "middle",
  mainSide = "left",
  layout = "horizontal",
  wrap = false,
  disabled,
  multipleLine = false,
  thumb,
  icon,
  extra,
  arrow,
  onClick,
  platform = "ios",
  ...otherProps
}) => {
  const wrapCls = classNames(styles.item, "u-list-item", className, {
    [styles.vertical]: layout === "vertical",
    [styles.gray]: gray,
    [styles.disabled]: disabled,
    [styles.error]: error,
    [styles.top]: align === "top",
    [styles.middle]: align === "middle",
    [styles.bottom]: align === "bottom",
  });

  const lineCls = classNames(styles.line, "u-list-item-line", {
    [styles.multiple]: multipleLine,
    [styles.wrap]: wrap,
    [styles.rightSideMain]: mainSide === "right",
  });

  const arrowCls = classNames(styles.arrow, {
    [styles.horizontal]: arrow === "horizontal",
    [styles.vertical]: arrow === "down" || arrow === "up",
    [styles.verticalUp]: arrow === "up",
  });

  return (
    <View
      onClick={onClick}
      hoverClass={classNames(styles.hover, hoverClass)}
      className={wrapCls}
      hoverStayTime={50}
      {...otherProps}
    >
      <View className={lineCls}>
        {thumb ? (
          <View className={styles.thumb}>
            {typeof thumb === "string" ? <Image src={thumb} /> : thumb}
          </View>
        ) : null}
        {icon ? (
          <Icon
            size={20}
            value={icon}
            className={classNames(styles.icon, "u-list-item-icon")}
          />
        ) : null}
        {children !== undefined && (
          <View className={classNames(styles.content, "u-list-item-content")}>
            {children}
          </View>
        )}
        {extra !== undefined && (
          <View className={classNames(styles.extra, "u-list-item-extra")}>
            {extra}
          </View>
        )}
        {arrow && <Icon value="right" size={16} className={arrowCls} />}
      </View>
    </View>
  );
};

export default ListItem;
