import React, { FC } from "react";
import { View } from "@tarojs/components";
import Empty, { EmptyProps } from "./index";
import styles from "./UndoEmpty.module.less";

const VisitEmpty: FC<EmptyProps> = (props) => (
  <View className={styles.text}>暂无待办</View>
  // <Empty
  //   remark='暂无待办'
  //   imgClass={styles.img}
  //   buttonVisible={false}
  //   imgSrc='https://betta-park-static.oss-cn-hangzhou.aliyuncs.com/components/Undo/undo_empty.png'
  //   {...props}
  // />
);

export default VisitEmpty;
