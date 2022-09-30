import { getSystemInfoSync } from "@tarojs/taro";

const systemInfo = getSystemInfoSync();

export const isIphoneX = systemInfo.model.includes("iPhone X");

export default systemInfo;