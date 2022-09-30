import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import _last from "lodash/last";
import { View, Picker } from "@tarojs/components";
import type { PickerMultiSelectorProps } from "@tarojs/components/types/Picker";
import type { CommonEventFunction } from "@tarojs/components/types/common";
import { getAddressTree } from "@/services/common";
import type { AddressSSD, ResponseData } from "@/types";
import styles from "./AddressPicker.module.less";

export interface AddressPickerProps
  extends Omit<PickerMultiSelectorProps, "mode" | "onChange"> {
  onDataReady?: (addressList: AddressSSD[]) => void;
  onChange?: (codes: number[], names: string[]) => void;
  // code 国家编码 330000 value 省/市/区名称
  valueType?: "code" | "value";
}

const getValue = (dataStore: AddressSSD[][], value: number[]) => {
  return value?.map((v, idx) => {
    return dataStore[idx][v];
  });
};
const getIndexByValue = (
  dataStore: AddressSSD[][],
  value: number[] | string[],
  valueType: "code" | "value"
) => {
  return value?.map((it, idx) => {
    const valueKey = valueType === "code" ? "id" : "name";
    const currentIndex = dataStore?.[idx]?.findIndex(
      (iit) => iit[valueKey] === it
    );
    return currentIndex ?? it;
  });
};
const getDisplayByValue = (
  dataStore: AddressSSD[][],
  value: number[] | string[],
  valueType: "code" | "value"
) => {
  return value?.map((it, idx) => {
    const valueKey = valueType === "code" ? "id" : "name";
    const currentItem = dataStore?.[idx]?.find((iit) => iit[valueKey] === it);
    return currentItem?.name || "--";
  });
};
const formatRangeData = (
  originData: AddressSSD[],
  initValues: number[] | string[],
  valueType: "code" | "value"
) => {
  if (initValues && initValues.length) {
    const valueKey = valueType === "code" ? "id" : "name";
    const children =
      originData.find((it) => it[valueKey] === initValues[0])?.children || [];
    return [originData, children];
  } else {
    return [originData, originData[0].children];
  }
};

const AddressPicker: React.FC<AddressPickerProps> = ({
  onChange,
  onDataReady,
  valueType,
  ...fieldProps
}) => {
  const [displayText, setDisplayText] = useState<string>("全部");
  const [range, setRange] = useState<AddressSSD[][]>([]);
  const [innerValue, setInnerValue] = useState<number[] | string[]>();

  useQuery(["getAddressTree"], () => getAddressTree(), {
    select: (d: ResponseData<AddressSSD[]>) => d.data,
    onSuccess: (d) => {
      //  setDisplayText   if has value

      const originData = d[0].children;

      const ranges = formatRangeData(originData, fieldProps.value, valueType);
      if (fieldProps.value && fieldProps.value.length) {
        // 服务器返回的数据里包括整个中国的省市区。
        // 需要从中间截取一些出来
        const names = getDisplayByValue(ranges, fieldProps.value, valueType);
        const indexs = getIndexByValue(ranges, fieldProps.value, valueType);
        setInnerValue(indexs);
        setDisplayText(_last(names) || "全部");
      }
      setRange(ranges);
      onDataReady?.(d);
    },
  });

  const handleChange: CommonEventFunction<PickerMultiSelectorProps.ChangeEventDetail> =
    useCallback(
      (e) => {
        const { value } = e.detail;

        const selectedItems = getValue(range, value);
        const codes = selectedItems?.map((it) => it.id);
        const names = selectedItems?.map((it) => it.name);
        setDisplayText(_last(names) || "全部");
        onChange?.(codes, names);
      },
      [range, valueType]
    );

  const handleColumnChange: CommonEventFunction<PickerMultiSelectorProps.ColumnChangeEventDetail> =
    useCallback(
      (e) => {
        const { column, value: columnValue } = e.detail;
        const currentColumnValue = range[column][columnValue];
        // 强制性的只到市
        switch (column) {
          case 0:
            range[1] = currentColumnValue.children;
            setRange([...range]);
            break;
          default:
            break;
        }
        setInnerValue((v) => {
          if (v === undefined) {
            v = [];
          }
          v[column] = columnValue;
          return v;
        });
      },
      [range]
    );

  return (
    <Picker
      {...fieldProps}
      value={innerValue}
      mode="multiSelector"
      onChange={handleChange}
      onColumnChange={handleColumnChange}
      range={range}
      rangeKey="name"
    >
      <View className={styles.display}>{displayText}</View>
    </Picker>
  );
};

export default AddressPicker;
