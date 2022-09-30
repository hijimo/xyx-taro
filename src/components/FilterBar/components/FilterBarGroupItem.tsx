import React, { useContext } from "react";
import _last from "lodash/last";
import DeviceGroupTree from "@/components/DeviceGroupTree";
import useCompanyNo from "@/hooks/useCompanyNo";
import FilterBarFormItem from "./FilterBarFormItem";
import type { FilterBarFormItemProps } from "./FilterBarFormItem";
import FilterBarContext from "./context";
import type { FilterBarContextProps } from "./context";
import type { DeviceGroupSSD } from "@/types";
import styles from "./FilterBarGroupItem.module.less";

export interface FilterBarGroupItemProps extends FilterBarFormItemProps {
  value?: string[];
  valueType?: "code" | "value";
}

const FilterBarGroupItem: React.FC<FilterBarGroupItemProps> = ({
  value,
  valueType = "code",
  ...fieldProps
}) => {
  const companyNo = useCompanyNo();

  const context = useContext<FilterBarContextProps | null>(FilterBarContext);
  const handleNodeClick = (data: DeviceGroupSSD, checked: boolean) => {
    if (checked) {
      context?.onChange?.({
        [`${fieldProps.name}`]: data?.name || "全部",
      });
    } else {
      // 取消选择就清空
      context?.onChange?.({
        [`${fieldProps.name}`]: "全部",
      });
    }
  };

  return (
    <FilterBarFormItem
      label="分组"
      direction="vertical"
      className={styles.filterBarGroupItem}
      {...fieldProps}
    >
      <DeviceGroupTree
        className={styles.tree}
        // defaultExpandAll
        onNodeClick={handleNodeClick}
        companyNo={companyNo}
      />
    </FilterBarFormItem>
  );
};

export default FilterBarGroupItem;
