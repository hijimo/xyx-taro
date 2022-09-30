import React, { FC } from "react";
import classNames from "classnames";
import { switchTab } from "@tarojs/taro";
import { Button, Text, View, Image, ITouchEvent } from "@tarojs/components";
import styles from "./index.module.less";

export interface EmptyProps {
  className?: string;
  style?: React.CSSProperties;
  buttonText?: string;
  imgClass?: string;
  remark?: string;
  imgSrc?: string;
  buttonVisible?: boolean;
  onButtonClick?: (event: ITouchEvent) => any;
}

const defaultHandleButtonClick = () => switchTab({ url: `/pages/hot/index` });

const Empty: FC<EmptyProps> = ({
  style,
  className,
  imgClass,
  buttonVisible = true,
  buttonText,
  remark,
  imgSrc,

  onButtonClick = defaultHandleButtonClick,
}) => {
  return (
    <View className={classNames(className, styles.empty)} style={style}>
      <Image className={classNames(styles.img, imgClass)} src={imgSrc || ""} />
      <Text className={styles.text}>{remark}</Text>
      {buttonVisible && (
        <Button
          className={styles.button}
          type="primary"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </View>
  );
};
export default Empty;
