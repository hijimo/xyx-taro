/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
import { getStorageSync } from "@tarojs/taro";
import { StorageKeyEnum } from "@/enums";

export default function useCompanyNo(): string {
  const { companyInfo } = getStorageSync(StorageKeyEnum.USER_INFO) || "";

  return companyInfo?.companyNo || "";
}
