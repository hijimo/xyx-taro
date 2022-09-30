import React from "react";
import classNames from "classnames";
import QuickList from "@/components/QuickList";
import Radio from "@/components/Radio";
import TreeItem from "./components/TreeItem";
import type { DeviceGroupSSD } from "@/types";
import styles from "./index.module.less";

interface SimpleTreeProps {
  className?: string;
  data: DeviceGroupSSD[];
  defaultExpandAll?: boolean;
  onNodeClick?: (data: DeviceGroupSSD, checked?: boolean) => void;
}

const SimpleTree: React.FC<SimpleTreeProps> = ({
  className,
  data,
  defaultExpandAll = false,
  onNodeClick,
  ...otherProps
}) => {
  return (
    <Radio.Group {...otherProps}>
      <QuickList
        className={classNames(styles.treeItem, className)}
        dataSource={data || []}
        gutter={0}
        column={1}
        renderItem={(it: DeviceGroupSSD) => (
          <TreeItem
            defaultExpand={defaultExpandAll}
            data={it}
            onNodeClick={onNodeClick}
          />
        )}
      />
    </Radio.Group>
  );
};

export default SimpleTree;
