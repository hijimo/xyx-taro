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
          {(r, b, { getFieldValue, setFieldValue }) => {
            // 微信小程序的CheckboxGroup不接收 value
            // 需要在每一个checkbox里单独设置。
            // 有空 改进
            return (
              <CheckboxGroup
                onChange={(e) => {
                  setFieldValue(
                    `${data.gameQuestionId}_${data.questionId}`,
                    e.detail.value?.map((it) => parseInt(it, 10))
                  );
                }}
              >
                {/* <Radio.Group> */}
                {data?.options?.map((q) => (
                  <View className={styles.option} key={q.optionId}>
                    <View className={styles.label}>{q?.optionContent}</View>
                    {/* <Radio value={q.optionId} className={styles.checkbox} /> */}
                    <Checkbox
                      checked={getFieldValue(
                        `${data.gameQuestionId}_${data.questionId}`
                      )?.includes(q.optionId)}
                      value={q.optionId}
                      className={styles.checkbox}
                    />
                  </View>
                ))}
                {/* </Radio.Group> */}
              </CheckboxGroup>
            );
          }}
        </Field>
      </View>
    </View>
  );
};

export default React.memo(Question) as typeof Question;
