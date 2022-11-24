import React, { FC } from "react";
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  CheckboxGroup,
} from "@tarojs/components";
import classNames from "classnames";
import { Field } from "rc-field-form";
import Checkbox from "@/components/CheckBox";
import Radio from "@/components/Radio";
import styles from "./Question.module.less";

interface QuestionProps {
  data?: any;
  index: number;
  className?: string;
}

const Question: FC<QuestionProps> = ({ data, index, className, ...props }) => {
  return (
    <View {...props} className={classNames(styles.question, className)}>
      <View className={styles.title}>{`${index + 1}、${
        data?.questionContent
      }`}</View>
      <View className={styles.options}>
        <Field
          name={`${data.gameQuestionId}_${data.questionId}`}
          rules={[
            {
              required: true,
              message: `题目：${data?.questionContent} 未答`,
            },
          ]}
        >
          {/* <Radio.Group> */}
          <CheckboxGroup>
            {data?.options?.map((q) => (
              <View className={styles.option} key={q.optionId}>
                <View className={styles.label}>{q?.optionContent}</View>
                {/* <Radio value={q.optionId} className={styles.checkbox} /> */}
                <Checkbox value={q.optionId} className={styles.checkbox} />
              </View>
            ))}
          </CheckboxGroup>
          {/* </Radio.Group> */}
        </Field>
      </View>
    </View>
  );
};

export default React.memo(Question) as typeof Question;
