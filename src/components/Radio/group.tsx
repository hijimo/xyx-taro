import React, { FC, useState, useEffect } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { RadioGroupContextProvider } from "./context";
import type { RadioProps } from "./index";
import styles from "./index.module.less";

export interface RadioGroupProps {
  className?: string;
  mustSelected?: boolean;
  multiple?: boolean;
  value?: any | any[];
  onChange?: (e: any) => void;
}

const getValue = (children: React.ReactNode) => {
  let value = null;
  let matched = false;

  React.Children.forEach(children, (radio: React.ReactElement<RadioProps>) => {
    if (radio && radio.props && radio.props.checked) {
      const { value: v } = radio.props;
      value = v;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
};

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    className,
    value,
    onChange,
    mustSelected = false,
    multiple = false,
    children,
  } = props;
  const [groupValue, setGroupValue] = useState<any | any[]>([]);

  useEffect(() => {
    if (multiple && !Array.isArray(value) && value !== undefined) {
      setGroupValue([value]);
    } else if (multiple && value === undefined) {
      setGroupValue([]);
    } else {
      setGroupValue(value);
    }
  }, [value, multiple]);
  useEffect(() => {
    const v = getValue(children);
    if (v && v.value) {
      setGroupValue(value);
    }
  }, []);

  const onRadioChange = (v: any) => {
    const lastValue = groupValue;

    const setValue = (val: any) => {
      let newValue: any | any[] = undefined;

      if (multiple && !Array.isArray(groupValue)) {
        newValue = [val];
      } else if (multiple) {
        const idx = groupValue.indexOf(val);
        if (idx === -1) {
          groupValue.push(val);
        } else {
          groupValue.splice(idx, 1);
        }
        newValue = [...groupValue];
      } else {
        newValue = val;
      }
      setGroupValue(newValue);
      onChange?.(newValue);
    };

    if (mustSelected) {
      setValue(v);
    } else {
      setValue(v === lastValue ? undefined : v);
    }
  };
  const renderRadios = () => {
    return (
      <View className={classNames(className, styles.group, "uc-radio-group")}>
        {children}
      </View>
    );
  };

  return (
    <RadioGroupContextProvider
      value={{
        value: groupValue,
        onChange: onRadioChange,
      }}
    >
      {renderRadios()}
    </RadioGroupContextProvider>
  );
};

RadioGroup.defaultProps = {};
export default RadioGroup;
