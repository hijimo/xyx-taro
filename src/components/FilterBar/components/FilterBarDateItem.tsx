import React, { useContext } from "react";
import DatePicker from "@/components/Pickers/DatePicker";
import FilterBarFormItem from "./FilterBarFormItem";
import type { FilterBarFormItemProps } from "./FilterBarFormItem";
import FilterBarContext from "./context";
import type { FilterBarContextProps } from "./context";
import styles from "./FilterBarDateItem.module.less";

export interface FilterBarDateItemProps extends FilterBarFormItemProps {
  value?: string;
}

const FilterBarDateItem: React.FC<FilterBarDateItemProps> = ({
  value,

  ...fieldProps
}) => {
  const context = useContext<FilterBarContextProps | null>(FilterBarContext);
  console.log("fieldProps", fieldProps);
  const handleChange = (e) => {
    const { value } = e.detail;
    context?.onChange?.({
      [`${fieldProps.name}`]: value || "全部",
    });
  };

  return (
    <FilterBarFormItem
      label="日期"
      className={styles.filterBarDateItem}
      {...fieldProps}
    >
      <DatePicker onChange={handleChange} />
    </FilterBarFormItem>
  );
};

export default FilterBarDateItem;
