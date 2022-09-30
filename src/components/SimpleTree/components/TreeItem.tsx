import React, { useState, useCallback, useMemo } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import Icon from "@/components/Icon";
import QuickList from "@/components/QuickList";
import Radio from "@/components/Radio";
import { BooleanEnum } from "@/enums";
import type { DeviceGroupSSD } from "@/types";
import styles from "./TreeItem.module.less";

interface TreeItemProps {
  className?: string;
  data: DeviceGroupSSD;
  defaultExpand?: boolean;
  onNodeClick?: (data: DeviceGroupSSD, checked?: boolean) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  className,
  data,
  defaultExpand = false,
  onNodeClick,
}) => {
  const [expand, setExpand] = useState<boolean>(defaultExpand);

  const handleToggle = useCallback(() => {
    if (data?.hasChildren) {
      setExpand((e) => !e);
    }
  }, [data]);
  const handleRadioChange = useCallback(
    (v) => {
      onNodeClick?.(data, v);
    },
    [data]
  );

  const hasChildren = useMemo(() => {
    return (
      data?.hasChildren === BooleanEnum.TRUE &&
      data?.children &&
      data?.children.length > 0
    );
  }, [data]);
  return (
    <View className={classNames(styles.treeItem, className)}>
      <View className={styles.treeNode}>
        {/* 只要拥有children的才显示icon */}
        {hasChildren && (
          <Icon
            onClick={handleToggle}
            value={expand ? "tree-expand" : "tree-collapse"}
            className={styles.icon}
          />
        )}
        <Radio
          className={styles.title}
          value={data.code}
          reverse
          onChange={handleRadioChange}
        >
          {data.name}
        </Radio>
      </View>
      {hasChildren && expand && (
        <QuickList
          className={styles.children}
          dataSource={data.children}
          gutter={0}
          column={1}
          renderItem={(it: any) => (
            <TreeItem
              defaultExpand={defaultExpand}
              data={it}
              onNodeClick={onNodeClick}
            />
          )}
        />
      )}
    </View>
  );
};

export default TreeItem;
