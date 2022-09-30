import React, { FC, useState, useEffect } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { TagGroupContextProvider } from "./context";
import styles from "./index.module.less";

export interface TagGroupProps {
  className?: string;
  mustSelected?: boolean;
  multiple?: boolean;
  value?: any | any[];
  onChange?: (e: any) => void;
}

const getTagValue = (children: React.ReactNode) => {
  let value = null;
  let matched = false;

  React.Children.forEach(children, (tag: any) => {
    if (tag && tag.props && tag.props.active) {
      const { value: v } = tag.props;
      value = v;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
};

const TagGroup: FC<TagGroupProps> = (props) => {
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
    const v = getTagValue(children);
    if (v && v.value) {
      setGroupValue(value);
    }
  }, []);

  const onTagChange = (v: any) => {
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
  const renderTags = () => {
    return (
      <View className={classNames(className, styles.group, "uc-tag-group")}>
        {children}
      </View>
    );
  };

  return (
    <TagGroupContextProvider
      value={{
        value: groupValue,
        onChange: onTagChange,
      }}
    >
      {renderTags()}
    </TagGroupContextProvider>
  );
};

TagGroup.defaultProps = {};
export default TagGroup;
