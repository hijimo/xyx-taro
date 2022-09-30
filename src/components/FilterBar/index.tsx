import React, { FC, useState, useMemo, useCallback, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import _map from "lodash/map";
import Icon from "@/components/Icon";
import dayjs from "dayjs";
import FilterSider from "./components/FilterSider";
import { FilterBarContextProvider } from "./components/context";
import styles from "./index.module.less";

export interface FilterBarProps {
  style?: React.CSSProperties;
  className?: string;
  // {'addres':'地区','status':'状态'}
  initialLabels: Record<string, string>;
  onFinish?: (values: any) => void;
  onSiderShowChange?: (f: boolean) => void;
  onReset?: () => void;
}

const FilterBar: FC<FilterBarProps> = ({
  style,
  className,
  initialLabels,
  children,
  onSiderShowChange,
  onFinish,
  onReset,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(false);

  const [labels, handleLabels] =
    useState<Record<string, string>>(initialLabels);

  useEffect(() => {
    onSiderShowChange?.(show);
  }, [show]);

  const handleLabelChange = useCallback((label: Record<string, string>) => {
    handleLabels((l) => ({
      ...l,
      ...label,
    }));
  }, []);

  const filterDisplayData = useMemo(() => {
    const obj: any = {};
    Object.keys(labels).forEach((key) => {
      obj[key] = labels[key];
    });
    // ...
    if (
      (obj.hasOwnProperty("gmtCreateBegin") ||
        obj.hasOwnProperty("gmtCreateEnd")) &&
      obj.hasOwnProperty("times")
    ) {
      obj.times = `${
        obj.gmtCreateBegin ? dayjs(obj.gmtCreateBegin).format("MM-DD") : "--"
      }/${obj.gmtCreateEnd ? dayjs(obj.gmtCreateEnd).format("MM-DD") : "--"}`;
      delete obj.gmtCreateBegin;
      delete obj.gmtCreateEnd;
    }

    return obj;
  }, [labels]);

  return (
    <FilterBarContextProvider
      value={{
        value: labels,
        onChange: handleLabelChange,
      }}
    >
      <View className={classNames(styles.filterBar, className)} style={style}>
        <View
          className={styles.display}
          onClick={() => {
            setShow(true);
          }}
        >
          {_map(filterDisplayData, (it, key) => (
            <View className={styles.label} key={key}>
              <Text className={styles.text}>
                {/* {it}-{key} */}
                {it}
              </Text>
              <Icon value="arrow-down-full" className={styles.icon} size={10} />
            </View>
          ))}
        </View>
        <FilterSider
          mask
          show={show}
          onCancel={() => setShow(false)}
          onFinish={(v) => {
            setShow(false);
            onFinish?.(v);
          }}
          onReset={() => {
            setShow(false);
            handleLabels(initialLabels);
            onReset?.();
          }}
        >
          {children}
        </FilterSider>
      </View>
    </FilterBarContextProvider>
  );
};

export default React.memo(FilterBar) as typeof FilterBar;
