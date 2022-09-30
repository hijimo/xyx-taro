import React, { useMemo } from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import _isString from "lodash/isString";
import _isNil from "lodash/isNil";
import { Field } from "rc-field-form";
import type { FieldProps } from "rc-field-form/es/Field";
import styles from "./index.module.less";

export interface FormItemProps extends FieldProps {
  className?: string;
  contentCls?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  extra?: React.ReactElement;
  label?: string | React.ReactElement;
}

const FormItem: React.FC<FormItemProps> = ({
  className,
  style,
  label,
  icon,
  contentCls,
  extra,
  children,
  ...fieldProps
}) => {
  const renderIcon = useMemo(() => {
    if (!_isNil(icon)) {
      return React.cloneElement(icon, {
        className: classNames(icon.props.className, styles.icon),
      });
    }
    return null;
  }, [icon]);

  const renderLabel = useMemo(() => {
    if (_isString(label)) {
      return <Text className={styles.label}>{label}</Text>;
    }
    if (!_isNil(label)) {
      return React.cloneElement(label, {
        className: classNames(label.props.className, styles.label),
      });
    }
    return null;
  }, [label]);

  const renderExtra = useMemo(() => {
    if (!_isNil(extra)) {
      return React.cloneElement(extra, {
        className: classNames(extra.props.className, styles.extra),
      });
    }
    return null;
  }, [extra]);
  return (
    <View className={classNames(styles.formItem, className)} style={style}>
      {renderIcon}
      {renderLabel}
      <View className={classNames(styles.formItemContent, contentCls)}>
        <Field {...fieldProps}>{children}</Field>
      </View>
      {renderExtra}
    </View>
  );
};

export default FormItem;
