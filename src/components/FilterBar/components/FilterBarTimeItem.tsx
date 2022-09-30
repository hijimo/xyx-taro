import React, { useContext } from "react";
import TimeRangePicker from "@/components/Pickers/TimeRangePicker";
import FilterBarFormItem from "./FilterBarFormItem";
import type { FilterBarFormItemProps } from "./FilterBarFormItem";
import FilterBarContext from "./context";
import type { FilterBarContextProps } from "./context";
import styles from "./FilterBarTimeItem.module.less";

export interface FilterBarTimeItemProps extends FilterBarFormItemProps {
  value?: string;
}

const FilterBarTimeItem: React.FC<FilterBarTimeItemProps> = ({
  value,

  ...fieldProps
}) => {
  const context = useContext<FilterBarContextProps | null>(FilterBarContext);
  console.log("fieldProps", fieldProps);
  const handleChange = (value) => {
    context?.onChange?.({
      [`${fieldProps.name}`]: value?.join("~") || "全部",
    });
  };

  return (
    <FilterBarFormItem
      label="时间段"
      className={styles.filterBarDateItem}
      {...fieldProps}
    >
      <TimeRangePicker onChange={handleChange} />
    </FilterBarFormItem>
  );
};

export default FilterBarTimeItem;
