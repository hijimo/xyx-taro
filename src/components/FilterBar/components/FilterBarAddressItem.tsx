import React, { useCallback, useContext } from "react";
import _last from "lodash/last";
// import RegionPicker from "@/components/Pickers/RegionPicker";
import AddressPicker from "@/components/Pickers/AddressPicker";
import FilterBarFormItem from "./FilterBarFormItem";
import type { FilterBarFormItemProps } from "./FilterBarFormItem";
import FilterBarContext from "./context";
import type { FilterBarContextProps } from "./context";
import styles from "./FilterBarAddressItem.module.less";

export interface FilterBarAddressItemProps extends FilterBarFormItemProps {
  value?: string[];
  // code 国家编码 330000 value 省/市/区名称
  valueType?: "code" | "value";
}

const FilterBarAddressItem: React.FC<FilterBarAddressItemProps> = ({
  value,
  valueType = "code",
  ...fieldProps
}) => {
  const context = useContext<FilterBarContextProps | null>(FilterBarContext);
  const handleChange = (codes: number[], names: string[]) => {
    context?.onChange?.({
      [`${fieldProps.name}`]: _last(names) || "全部",
    });
  };

  const transformValueFormEvent = useCallback(
    (codes: number[], names: string[]) => {
      if (valueType === "code") {
        return codes;
      } else {
        return names;
      }
    },
    [valueType]
  );
  return (
    <FilterBarFormItem
      label="地区"
      className={styles.filterBarAddressItem}
      {...fieldProps}
      getValueFromEvent={transformValueFormEvent}
    >
      <AddressPicker onChange={handleChange} valueType={valueType} />
    </FilterBarFormItem>
  );
};

export default FilterBarAddressItem;
