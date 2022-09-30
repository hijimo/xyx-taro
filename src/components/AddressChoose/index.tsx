import React, { useState, useCallback } from "react";
import classNames from "classnames";
import { chooseAddress } from "@tarojs/taro";
import { View } from "@tarojs/components";
import type { Address } from "@/types";
import styles from "./index.module.less";

export interface AddressChooseProps {
  className?: string;
  placeholder?: string;
  onChange?: (address: Address) => void;
}

const AddressChoose: React.FC<AddressChooseProps> = ({
  className,
  placeholder = "请选择你的地址",
  onChange,
}) => {
  const [address, setAddress] = useState<undefined | Address>(undefined);

  const handleChooseAddress = useCallback(() => {
    chooseAddress({
      success(res) {
        console.log("res", res);
        setAddress(res);
        onChange?.(res);
      },
    });
  }, []);
  return (
    <View
      className={classNames(styles.addressChoose, className)}
      onClick={handleChooseAddress}
    >
      {address === undefined && (
        <View className={styles.placeholder}>{placeholder}</View>
      )}
      {address && address.detailInfo?.length > 0 && (
        <View
          className={styles.text}
        >{`${address?.provinceName}${address?.cityName}${address?.countyName}${address?.detailInfo}`}</View>
      )}
    </View>
  );
};

export default React.memo(AddressChoose) as typeof AddressChoose;
