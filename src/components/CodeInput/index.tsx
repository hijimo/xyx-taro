import React, { useCallback, useState } from "react";
import { View, Input, Button } from "@tarojs/components";
import { showToast } from "@tarojs/taro";
import classNames from "classnames";
import { InputProps } from "@tarojs/components/types/Input";
import type { CommonEventFunction } from "@tarojs/components/types/common";
import { useMutation } from "react-query";
import { postPhoneCode } from "@/services/common";
import { paternPhone } from "@/pattern/index";
import styles from "./index.module.less";

export interface PhoneInputProps extends InputProps {
  style?: React.CSSProperties;
  className?: string;
  onChange?: (v) => void;
}

const MAX_TIME = 60;

const PhoneInput: React.FC<PhoneInputProps> = ({
  style,
  className,
  disabled,
  onChange,
  ...otherProps
}) => {
  const [cd, setCd] = useState<number>(0);
  const [phone, setPhone] = useState<string>();

  const { mutate, isLoading } = useMutation(
    (phoneNumber: string) => postPhoneCode(phoneNumber),
    {
      onSuccess: () => {
        // 成功也不清空
        //  setCd(0)
      },
      onError: () => {
        setCd(0);
      },
    }
  );

  const start = useCallback((time) => {
    setCd(time - 1);
    const fn = () => {
      setTimeout(() => {
        setCd((v) => {
          if (v > 0) {
            fn();
            return v - 1;
          }
          return v;
        });
      }, 1000);
    };
    // 赶时间随便写写，以后优化。
    fn();
  }, []);
  const handleClick = useCallback(
    (e) => {
      if (phone && paternPhone.test(phone)) {
        mutate(phone);
        start(MAX_TIME);
      } else if (phone && !paternPhone.test(phone)) {
        showToast({
          title: "请输入正确的手机号码",
          icon: "error",
        });
      }
    },
    [phone, mutate]
  );
  const handleChange: CommonEventFunction<InputProps.inputEventDetail> =
    useCallback((e) => {
      const { value } = e.detail;
      setPhone(value);
      console.log("phone", e.detail.value);
      onChange?.(value);
    }, []);
  return (
    <View className={classNames(styles.codeInput, className)} style={style}>
      <Input
        className={styles.input}
        {...otherProps}
        disabled={disabled}
        value={phone}
        onInput={handleChange}
      />
      <Button
        disabled={disabled}
        loading={isLoading}
        className={classNames(
          styles.button,
          (disabled || cd > 0) && styles.disabled
        )}
        onClick={handleClick}
      >
        {cd > 0 ? `${cd}` : "获取"}
      </Button>
    </View>
  );
};

export default React.memo(PhoneInput) as typeof PhoneInput;
