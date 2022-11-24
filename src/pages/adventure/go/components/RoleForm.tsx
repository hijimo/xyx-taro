// 店铺信息
import React, { useState, useCallback } from "react";
import { View, Input, Form as AtForm, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import classNames from "classnames";
import Form from "rc-field-form";
import { FormProps } from "rc-field-form/es/Form";
import { useQuery } from "react-query";
import FormItem from "@/components/FormItem/Index";
import UPicker from "@/components/UPicker";
import { createGame } from "@/services/game";
import { getFigureInfo } from "@/services/figure";
import { useMutation } from "react-query";
import { BooleanEnum } from "@/enums";
import styles from "./RoleForm.module.less";

interface RoleFormProps extends FormProps {
  data: any;
  strategyId: string;
  style?: React.CSSProperties;
  className?: string;
}
const RoleForm: React.FC<RoleFormProps> = ({
  style,
  data,
  strategyId,
  className,
  ...otherProps
}) => {
  const [roleId, setRoleId] = useState<number>();

  const [form] = Form.useForm();

  const { data: roleData } = useQuery(
    ["getFigureInfo", [roleId]],
    () => getFigureInfo(roleId!),
    {
      select: (d) => d.data,
      enabled: !!roleId,
    }
  );
  const { mutate, isLoading } = useMutation(
    (phoneNumber: string) => createGame(phoneNumber),
    {
      onSuccess: () => {
        Taro.showToast({
          icon: "none",
          title: "添加成功",
        });
      },
    }
  );
  // createGame;

  const handleFinish = async (values) => {
    console.log("values", values);
    mutate({
      ...values,
      strategyId,
    });
    //
  };

  const handleSubmit = useCallback(() => {
    form.submit();
  }, []);

  return (
    <React.Fragment>
      <View style={style} className={classNames(styles.roleForm, className)}>
        <View className={styles.avatar}>
          <Image src={roleData?.avatar} className={styles.img} />
        </View>
        <View className={styles.form}>
          <Form
            component={AtForm}
            {...otherProps}
            onFinish={handleFinish}
            form={form}
          >
            <View className={styles.box}>
              <FormItem
                className={classNames(styles.formItem, styles.formItem1)}
                name="playerName"
                label="姓名"
              >
                <Input
                  className={styles.input}
                  placeholderClass={styles.placeholder}
                  placeholder="请输入姓名"
                />
              </FormItem>
              <FormItem
                className={styles.formItem}
                name="gameRoleId"
                label="角色"
              >
                <UPicker
                  range={data || []}
                  rangeKey="gameRoleName"
                  rangeValueKey="gameRoleId"
                  onChange={(v) => {
                    setRoleId(v);
                  }}
                  className={styles.input}
                  mode="selector"
                />
              </FormItem>
            </View>
          </Form>
        </View>
        <View className={styles.split} />
        <View className={styles.title}>角色人物</View>
        <View className={styles.text}>{roleData?.gameRoleInfo}</View>
        <View className={styles.title}>任务</View>
        <View className={styles.text}>{roleData?.gameRoleMission || ""}</View>
      </View>
      <Button
        loading={isLoading}
        disabled={data?.strategyStatus === BooleanEnum.TRUE}
        className={styles.button}
        onClick={handleSubmit}
      >
        出发
      </Button>
    </React.Fragment>
  );
};

export default React.memo(RoleForm);
