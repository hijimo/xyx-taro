import React, { FC, useState, useEffect, useContext } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import Icon from "@/components/Icon";
import TagGroupContext from "./context";

import Group, { TagGroupProps } from "./group";
import styles from "./index.module.less";

interface TagProps {
  className?: string;
  color?: string;
  onChange?: Function;
  value?: any;
  showClose?: boolean;
  full?: boolean;
  size?: "normal" | "large";
  type?: "normal" | "solid";
}
interface ITag extends FC<TagProps> {
  Group: React.FunctionComponent<TagGroupProps>;
}

const Tag: ITag = (props) => {
  const {
    className,
    children,
    onChange,
    value,
    full = false,
    showClose = false,
    size = "normal",
    color,
    type = "normal",
    ...otherProps
  } = props;
  const [active, setActive] = useState(false);

  const context = useContext<TagGroupProps | null>(TagGroupContext);
  useEffect(() => {
    if (
      context &&
      (context.value === value || context.value?.includes?.(value))
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [context]);

  return (
    <View
      onClick={() => {
        const newValue = !active;
        if (!("value" in props)) {
          setActive(newValue);
        }
        if (onChange) {
          onChange(newValue ? value : undefined);
        }
        if (context?.onChange) {
          context.onChange(value);
        }
      }}
      // style={{ backgroundColor: color }}
      className={classNames(
        styles.tag,
        "uc-tag",
        className,
        full && styles.full,
        active && styles.active,
        active && "active",
        size === "large" ? styles.large : "",
        type === "solid" ? styles.solid : "",
        type === "solid" ? "uc-tag-solid" : ""
      )}
      {...otherProps}
    >
      {showClose && <Icon value="close" size={14} className={styles.close} />}
      {children}
    </View>
  );
};

Tag.defaultProps = {
  color: "#f3f3f3",
};
Tag.Group = Group;

export default Tag;
