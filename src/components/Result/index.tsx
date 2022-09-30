import React, { FC } from "react";
import classNames from "classnames";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import _isString from "lodash/isString";
import Icon from "@/components/Icon";
import styles from "./index.module.less";

interface ResultIndexProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: "fail" | "success" | "waitting" | React.ReactNode;
  title?: string;
  subTitle?: string | React.ReactNode;
  button1Text?: string;
  button2Text?: string;
  button1Click?: () => void;
  button2Click?: () => void;
}

const ResultIndex: FC<ResultIndexProps> = ({
  className,
  style,
  icon = "waitting",
  title,
  subTitle,
  button1Text,
  button2Text,
  button1Click,
  button2Click,
}) => {
  return (
    <View className={classNames(className, styles.result)} style={style}>
      {_isString(icon) ? (
        <Icon
          value={icon}
          className={classNames(styles.icon, styles[icon])}
          size={32}
        />
      ) : (
        icon
      )}

      {title ? <View className={styles.title}>{title}</View> : null}
      {subTitle ? <View className={styles.desc}>{subTitle}</View> : null}
      <View className={styles.activeBar}>
        {button1Text ? (
          <Button className={styles.button} onClick={button1Click}>
            {button1Text}
          </Button>
        ) : null}

        {button2Text ? (
          <Button
            onClick={button2Click}
            type="primary"
            className={styles.button}
          >
            {button2Text}
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default ResultIndex;
