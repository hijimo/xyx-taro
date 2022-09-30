import React from "react";
import { View } from "@tarojs/components";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./index.module.less";

export interface SiderProps {
  show: boolean;
  mask?: boolean;
  className?: string;
  maskCancel?: boolean;
  onCancel?: () => void;
}

const Sider: React.FC<SiderProps> = ({
  show,
  className,
  mask = false,
  maskCancel = true,
  onCancel,
  children,
  ...props
}) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="fadeInLeft"
      unmountOnExit
    >
      <View
        className={classNames(styles.sider, className, show && styles.show)}
        {...props}
      >
        {mask && (
          <View
            onClick={() => {
              maskCancel && onCancel?.();
            }}
            className={styles.mask}
          />
        )}
        <View
          className={classNames(styles.content, show && styles.show)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          {children}
        </View>
      </View>
    </CSSTransition>
  );
};

export default Sider;
