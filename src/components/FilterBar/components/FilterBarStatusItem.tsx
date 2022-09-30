import React, { useContext } from "react";
import _map from "lodash/map";
import { OnlineStatusDesc } from "@/enums";
import Tag from "@/components/Tag";
import FilterBarFormItem from "./FilterBarFormItem";
import type { FilterBarFormItemProps } from "./FilterBarFormItem";
import FilterBarContext from "./context";
import type { FilterBarContextProps } from "./context";
import styles from "./FilterBarStatusItem.module.less";

export interface FilterBarStatusItemProps extends FilterBarFormItemProps {}

const FilterBarStatusItem: React.FC<FilterBarStatusItemProps> = ({
  ...fieldProps
}) => {
  const context = useContext<FilterBarContextProps | null>(FilterBarContext);
  const handleChange = (v) => {
    context?.onChange({
      [fieldProps.name]: OnlineStatusDesc[v]?.text,
    });
  };
  return (
    <FilterBarFormItem
      label="状态"
      direction="vertical"
      className={styles.filterBarAddressItem}
      {...fieldProps}
    >
      <Tag.Group onChange={handleChange}>
        {_map(OnlineStatusDesc, (val, key) => (
          <Tag value={key} key={key} type="solid" full>
            {val.text}
          </Tag>
        ))}
      </Tag.Group>
    </FilterBarFormItem>
  );
};

export default FilterBarStatusItem;
