import { GLOBAL_TEMP_VARIABLE } from '@/redux/constants/global';

// 一个公共的空间，用来临时存取全局变量
export const updateGlobalTempVariable = (data: any) => {
  return {
    type: GLOBAL_TEMP_VARIABLE,
    payload: data,
  };
};
export const clearGlobalTempVariable = () => {
  return {
    type: GLOBAL_TEMP_VARIABLE,
    payload: null,
  };
};
