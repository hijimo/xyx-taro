import React, { FC, useCallback } from "react";
import { View, Input, Button } from "@tarojs/components";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { InputProps } from "@tarojs/components/types/Input";
import { asyncUpdateUserPhone } from "@/redux/actions/user";
import styles from "./index.module.less";

export interface PhoneInputProps extends InputProps {
  style?: React.CSSProperties;
  className?: string;
}

const PhoneInput: FC<PhoneInputProps> = ({
  style,
  className,
  disabled,
  ...InputProps
}) => {
  const dispatch = useDispatch();
  const handlePhoneBind = useCallback((e) => {
    if (e.detail.encryptedData !== undefined) {
      dispatch(asyncUpdateUserPhone(e.detail));
    }
  }, []);
  return (
    <View className={classNames(styles.phoneInput, className)} style={style}>
      <Input className={styles.input} disabled={disabled} {...InputProps} />
      <Button
        disabled={disabled}
        className={classNames(styles.button, disabled && styles.disabled)}
        onGetPhoneNumber={handlePhoneBind}
        openType="getPhoneNumber"
      >
        获取
      </Button>
    </View>
  );
};

export default React.memo(PhoneInput) as typeof PhoneInput;
