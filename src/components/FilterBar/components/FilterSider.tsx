import React, { useCallback } from "react";
import { Form as AtForm, View, Button } from "@tarojs/components";
import Sider from "@/components/Sider";
import Form from "rc-field-form";
import classNames from "classnames";
import type { SiderProps } from "@/components/Sider";
import styles from "./FilterSider.module.less";

interface FilterSiderProps extends SiderProps {
  onFinish?: (values: any) => void;
  onReset?: () => void;
}

const FilterSider: React.FC<FilterSiderProps> = ({
  children,
  onFinish,
  onReset,
  ...props
}) => {
  const [form] = Form.useForm();
  const handleReset = useCallback(() => {
    form.resetFields();
    onReset?.();
  }, [form]);

  return (
    <Sider maskCancel={false} {...props}>
      <Form component={AtForm} form={form} onFinish={onFinish}>
        <View className={styles.content}>
          <View className={styles.form}>{children}</View>
          <View className={styles.footer}>
            <Button
              className={classNames(styles.reset, styles.button)}
              onClick={handleReset}
            >
              重置
            </Button>
            <Button
              className={classNames(styles.submit, styles.button)}
              type="primary"
              formType="submit"
            >
              提交
            </Button>
          </View>
        </View>
      </Form>
    </Sider>
  );
};

export default FilterSider;
