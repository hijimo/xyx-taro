import React, { FC } from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import styles from "./index.module.less";

interface PriceProps extends ViewProps {
  style?: React.CSSProperties;
  className?: string;
  value: string | number;
  unit?: string;
  invalid?: boolean;
  size?: "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Price: FC<PriceProps> = ({
  style,
  className,
  unit = "￥",
  size = "md",
  value,
  invalid = false,
  ...otherProps
}) => {
  const currencyAmountClass = classNames(
    styles.price,
    styles[size],
    { [styles.invalid]: invalid },
    className
  );

  const [amountInteger, amountDecimal] = `${value}`.split(".");

  return (
    <View className={currencyAmountClass} style={style} {...otherProps}>
      <Text className={styles.currency}>{unit}</Text>
      {amountInteger}
      {amountDecimal && <Text>.{amountDecimal?.substr(0, 2)}</Text>}
    </View>
  );
};
export default Price;
