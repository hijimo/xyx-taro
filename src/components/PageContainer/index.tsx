import React, { useCallback } from "react";
import classNames from "classnames";
import { PageContainer, View } from "@tarojs/components";
import type { PageContainerProps } from "@tarojs/components/types/PageContainer";
import Icon from "@/components/Icon";
import styles from "./index.module.less";

export interface PageProps extends PageContainerProps {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onCancel?: () => void;
}

const Page: React.FC<PageProps> = ({
  className,
  style,
  title,
  children,
  onCancel,
  position = "bottom",
  ...props
}) => {
  const wrapCls = classNames(styles.pageContainer, className);
  const handleCancel = useCallback(() => {
    onCancel?.();
  }, []);
  return (
    <PageContainer
      className={wrapCls}
      style={style}
      {...props}
      onClickOverlay={handleCancel}
    >
      <Icon
        value="close"
        className={styles.close}
        size={20}
        onClick={handleCancel}
      />
      <View className={styles.header}>{title}</View>
      <View className={styles.content}>{children}</View>
    </PageContainer>
  );
};

export default Page;
