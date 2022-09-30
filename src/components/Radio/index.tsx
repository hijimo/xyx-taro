import React, { useEffect, useContext } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import useControlled from "@/hooks/useControlled";
import RadioGroupContext from "./context";
import Group, { RadioGroupProps } from "./group";
import styles from "./index.module.less";

export interface RadioProps {
  className?: string;
  onChange?: Function;
  value?: any;
  checked?: boolean;
  /**
   * 默认图标在左，文案在右，
   * 如果reverse, 文案在左，图标在右
   */
  reverse?: boolean;
}

interface IRadio extends React.FC<RadioProps> {
  Group: React.FunctionComponent<RadioGroupProps>;
}

const Radio: IRadio = (props) => {
  const {
    className,
    children,
    onChange,
    value,
    checked,
    reverse = false,
    ...otherProps
  } = props;

  const [active, setActive] = useControlled<boolean>({
    controlled: checked,
    default: false,
    name: "Radio",
    state: "active",
  });

  const context = useContext<RadioGroupProps | null>(RadioGroupContext);
  useEffect(() => {
    if (
      context &&
      (context.value === value || context.value?.includes?.(value))
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [context]);

  return (
    <View
      onClick={() => {
        const newValue = !active;
        if (!("value" in props)) {
          setActive(newValue);
        }
        if (onChange) {
          onChange(newValue);
        }
        if (context?.onChange) {
          context.onChange(newValue ? value : undefined);
        }
      }}
      className={classNames(
        styles.radio,
        "uc-radio",
        className,
        reverse && styles.reverse,
        active && styles.active,
        active && "active"
      )}
      {...otherProps}
    >
      <View className={classNames(styles.icon, "uc-radio-icon")} />
      <View className={classNames(styles.label, "uc-radio-label")}>
        {children}
      </View>
    </View>
  );
};

Radio.Group = Group;

export default Radio;
