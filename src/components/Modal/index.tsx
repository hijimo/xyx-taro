import React, { FC } from "react";
import classNames from "classnames";
import { View, Text, Button } from "@tarojs/components";
import type { ButtonProps } from "@tarojs/components/types/Button";
import Icon from "@/components/Icon";
import styles from "./index.module.less";

export interface ModalProps {
  className?: string;
  modalCls?: string;
  bodyCls?: string;
  style?: React.CSSProperties;
  visible: boolean;
  title?: string;
  hideClose?: boolean;
  okButtonText?: string;
  cancelButtonText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  renderHeader?: (() => React.ReactNode) | null;
  renderFooter?: (() => React.ReactNode) | null;
  onOk?: () => void;
  onCancel?: () => void;
}

const Modal: FC<ModalProps> = ({
  style,
  className,
  bodyCls,
  modalCls,
  visible,
  title,
  hideClose = false,
  okButtonText = "确定",
  cancelButtonText = "取消",
  okButtonProps,
  cancelButtonProps,
  onOk,
  onCancel,
  renderHeader = () => (
    <View className={styles.header}>
      {title?.length > 0 && <Text className={styles.title}>{title}</Text>}
      {hideClose === false && (
        <Icon
          value="close"
          className={styles.close}
          size={14}
          onClick={onCancel}
        />
      )}
    </View>
  ),
  renderFooter = () => {
    return (
      <View className={styles.footer}>
        <Button
          {...cancelButtonProps}
          onClick={onCancel}
          className={styles.button}
          size="mini"
        >
          {cancelButtonText}
        </Button>
        <Button
          {...okButtonProps}
          onClick={onOk}
          className={styles.button}
          type="primary"
          size="mini"
        >
          {okButtonText}
        </Button>
      </View>
    );
  },
  children,
}) => {
  return (
    <View
      className={classNames(styles.modal, modalCls)}
      style={{
        display: visible ? "flex" : "none",
      }}
    >
      <View className={classNames(styles.container, className)} style={style}>
        {renderHeader?.()}

        <View className={classNames(bodyCls, styles.content)}>{children}</View>
        {renderFooter?.()}
      </View>
    </View>
  );
};
export default Modal;
