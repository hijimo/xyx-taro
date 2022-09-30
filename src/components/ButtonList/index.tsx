import React from "react";
import classNames from "classnames";
import _capitalize from "lodash/capitalize";
import { View } from "@tarojs/components";
import styles from "./index.module.less";

export interface ButtonListProps {
  className?: string;
  align?: "left" | "right";
  inline?: boolean;
  gutterSize?: "small" | "medium" | "large";
}

const ButtonList: React.FC<ButtonListProps> = ({
  className,
  align = "left",
  inline = true,
  gutterSize = "medium",
  children,
}) => {
  const wrapClass = classNames(
    styles.buttonList,
    styles[align],
    { [styles.inline]: inline },
    styles[`gutter${_capitalize(gutterSize)}`],
    className
  );

  const buttons = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          className: classNames(child.props.className, styles.button),
        })
      : child
  );

  return <View className={wrapClass}>{buttons}</View>;
};

export default React.memo(ButtonList) as typeof ButtonList;
