import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import { View, Button } from "@tarojs/components";
import {
  navigateTo,
  useRouter,
  setNavigationBarTitle,
  showToast,
  showModal,
} from "@tarojs/taro";
import nzh from "nzh/dist/nzh.cn";
import classNames from "classnames";
import _get from "lodash/get";
import _fromPairs from "lodash/fromPairs";
import { useQuery, useMutation } from "react-query";
import Form from "rc-field-form";
import { getGameInfo, validGame } from "@/services/game";

import Introduction from "./components/Introduction";
import QuestionList from "./components/QuestionList";

import styles from "./index.module.less";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { gameId } = useRouter()?.params || {};

  const [form] = Form.useForm();
  // 当前章节序号
  const [index, setIndex] = useState<number>(0);

  const { data } = useQuery(
    ["getGameInfo", [gameId]],
    () => getGameInfo(gameId!),
    {
      select: (d) => d.data,
      onSuccess: (d) => {
        setNavigationBarTitle({
          title: d.strategyName,
        });
      },
    }
  );
  const isSubmit =
    data?.gameChapter?.length && index >= data?.gameChapter?.length - 1;
  const { mutate, isLoading } = useMutation(
    (values: any) => validGame(values),
    {
      onSuccess: () => {
        setIndex((i) => i + 1);
        if (isSubmit) {
          navigateTo({
            url: `/pages/chapter/result/index?gameId=${gameId}`,
          });
        }
      },
    }
  );

  // 当前章节
  const chapter = useMemo(() => {
    return data?.gameChapter?.[index] || undefined;
  }, [index, data]);

  const title = useMemo(() => {
    return `第${nzh.encodeS(index + 1)}章`;
  }, [index]);
  useEffect(() => {
    const historyValues = _fromPairs(
      chapter?.questions.map((it) => {
        return [
          `${it.gameQuestionId}_${it.questionId}`,
          it?.answer?.split(",")?.map((i) => parseInt(i, 10)) || undefined,
        ];
      })
    );
    if (form && chapter) {
      form.setFieldsValue(historyValues);
    }
  }, [chapter, form]);

  const handleFinish = (values) => {
    const getSelectOptions = () => {
      return (
        Object.keys(values).map((key) => {
          const [gameQuestionId, questionId] = key.split("_");
          return {
            gameQuestionId,
            optionIds: values[key],
            questionId,
          };
        }) || []
      );
    };

    const params = {
      gameId: gameId!,
      gameChapterId: chapter.gameChapterId,
      selectOptions: getSelectOptions(),
    };
    if (isSubmit) {
      showModal({
        title: "提示",
        content: "确定要完成冒险了吗？",
        success(res) {
          if (res.confirm) {
            mutate(params);
          }
        },
      });
    } else {
      mutate(params);
    }
  };
  const handleFinishFail = useCallback(({ errorFields }) => {
    showToast({
      title: `${_get(errorFields, "[0].errors[0]")}`,
      icon: "none",
    });
  }, []);
  const handleNextClick = useCallback(() => {
    form.submit();
  }, [form]);
  return (
    <View className={styles.index}>
      <View className={styles.title}>{title}</View>
      <Introduction data={chapter} />
      <QuestionList
        className={styles.list}
        data={chapter?.questions}
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFail}
      />
      <View className={styles.buttonBar}>
        <Button className={classNames(styles.button)} disabled={index === 0}>
          上一章
        </Button>
        <Button
          className={classNames(styles.button)}
          onClick={handleNextClick}
          loading={isLoading}
        >
          {isSubmit ? "提交" : "下一章"}
        </Button>
      </View>
    </View>
  );
};
export default Index;
