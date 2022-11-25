export enum ChapterStatusEnum {
  CREATE = 0,
  SUCCESS = 100,
  FAILED = 50,
}
export const ChapterStatusEnumDes = {
  [ChapterStatusEnum.CREATE]: "创建",
  [ChapterStatusEnum.SUCCESS]: "已打卡",
  [ChapterStatusEnum.FAILED]: "挑战失败",
};
