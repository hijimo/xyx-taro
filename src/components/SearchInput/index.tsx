import React, { FC, useState, useMemo } from "react";
import { View, Input } from "@tarojs/components";
import classNames from "classnames";
import type { InputProps } from "@tarojs/components/types/Input";
import type { CommonEventFunction } from "@tarojs/components/types/common";
import Icon from "@/components/Icon";
import styles from "./index.module.less";

export interface SearchInputProps extends InputProps {
  style?: React.CSSProperties;
  className?: string;
  contentCls?: string;
  /**
   * 某些特殊情况下，需要不生成input,不然会穿透
   */
  hideInput?: boolean;
  /** 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
   * @supported weapp, h5, rn
   */
  onFocus?: CommonEventFunction<InputProps.inputForceEventDetail>;

  /** 输入框失去焦点时触发
   *
   * event.detail = {value: value}
   * @supported weapp, h5, rn
   */
  onBlur?: CommonEventFunction<InputProps.inputValueEventDetail>;
  onSearch?: CommonEventFunction<InputProps.inputValueEventDetail>;
}

const SearchInput: FC<SearchInputProps> = ({
  style,
  className,
  contentCls,
  hideInput = false,
  onFocus,
  onBlur,
  onSearch,
  ...InputProps
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const cls = useMemo(() => {
    return classNames(styles.content, contentCls, {
      [styles.focus]: isFocus,
    });
  }, [isFocus]);
  const handleBlur = (e) => {
    setIsFocus(false);
    onBlur?.(e);
  };
  const handleFocus = (e) => {
    setIsFocus(true);
    onFocus?.(e);
  };
  return (
    <View className={classNames(styles.searchInput, className)} style={style}>
      <View className={cls}>
        <Icon value="search" className={styles.icon} />
        <Input
          style={{
            visibility: hideInput ? "hidden" : "initial",
          }}
          className={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={onSearch}
          {...InputProps}
        />

        {/* {hideInput ? (
          <View className={styles.input} />
        ) : (
          <Input
            className={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onConfirm={onSearch}
            {...InputProps}
          />
        )} */}
      </View>
    </View>
  );
};

export default React.memo(SearchInput) as typeof SearchInput;
