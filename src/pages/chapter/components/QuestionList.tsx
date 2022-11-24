import React, { FC } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import Form from "rc-field-form";
import Question from "./Question";
import styles from "./QuestionList.module.less";

interface QuestionListProps {
  data?: any[];
  className?: string;
}

const QuestionList: FC<QuestionListProps> = ({ data, className, ...props }) => {
  console.log("questionlist", data);
  return (
    <View className={classNames(styles.questionList, className)}>
      <View className={styles.title}>答题</View>
      <View className={styles.list}>
        <Form {...props}>
          {data?.map((it, idx) => (
            <Question data={it} key={it.questionId} index={idx} />
          ))}
        </Form>
      </View>
    </View>
  );
};

export default React.memo(QuestionList) as typeof QuestionList;
