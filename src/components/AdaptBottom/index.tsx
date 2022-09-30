import React, { FC } from "react";
import classNames from "classnames";
import AdaptContainer from "@/components/AdaptContainer";
import styles from "./index.module.less";

interface AdaptBottomProps {
  style?: React.CSSProperties;
  className?: string;
}

const AdaptBottom: FC<AdaptBottomProps> = React.memo(
  ({ style, children, className }) => {
    return (
      <AdaptContainer
        className={classNames(styles.container, className)}
        style={style}
      >
        {children}
      </AdaptContainer>
    );
  }
);

export default AdaptBottom;
