import React, { FC, useCallback, useMemo } from "react";
import { View, Image, Button, Form as AtForm, Input } from "@tarojs/components";
import { showToast } from "@tarojs/taro";
import Form, { Field } from "rc-field-form";
import classNames from "classnames";
import _get from "lodash/get";
import styles from "./Reward.module.less";

interface StatusProps {
  data?: any;
  className?: string;
}

const Status: FC<StatusProps> = ({ data, className }) => {
  const [form] = Form.useForm();

  const handleFinish = useCallback(async (values) => {
    console.log("values", values);

    //
  }, []);

  const reward = useMemo(() => {
    if (data?.finalRewardText) {
      return JSON.parse(data?.finalRewardText);
    }
  }, [data]);

  const handleFinishFail = useCallback(({ errorFields }) => {
    showToast({
      title: `${_get(errorFields, "[0].errors[0]")}`,
      icon: "none",
    });
  }, []);

  return (
    <View className={classNames(styles.reward, className)}>
      <View className={styles.title}>终极宝箱</View>
      <Image src={_get(reward, "image[0].url")} className={styles.img} />
      <Form
        component={AtForm}
        onFinishFailed={handleFinishFail}
        onFinish={handleFinish}
        form={form}
      >
        <View className={styles.formItem}>
          <View className={styles.text}>终极宝箱秘钥</View>
          <Field name="key" rules={[{ required: true, message: "请输入密钥" }]}>
            <Input
              placeholder="8位数密钥"
              className={styles.input}
              maxlength={8}
            />
          </Field>
        </View>
        <View className={styles.tips}>
          注：终极密钥需要3把密钥组合，总共三次开锁机会
        </View>
        <Button className={styles.button} formType="submit">
          开箱
        </Button>
      </Form>
    </View>
  );
};

export default React.memo(Status) as typeof Status;
