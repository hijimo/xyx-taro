import {
  SET_ORDER_LIST_REFRESH,
  SET_ORDER_LIST_REFRESH_IMMEDIATE,
  RESET_ORDER_LIST_REFRESH,
  SET_ORDER_DETAIL_REFRESH,
  SET_ORDER_DETAIL_REFRESH_IMMEDIATE,
  RESET_ORDER_DETAIL_REFRESH,
} from '../constants/refresh';

export const setOrderListRefresh = () => {
  return {
    type: SET_ORDER_LIST_REFRESH,
  };
};

export const setOrderListRefreshImmediate = () => {
  return {
    type: SET_ORDER_LIST_REFRESH_IMMEDIATE,
  };
};

export const resetOrderListRefresh = () => {
  return {
    type: RESET_ORDER_LIST_REFRESH,
  };
};

export const setOrderDetailRefresh = () => {
  return {
    type: SET_ORDER_DETAIL_REFRESH,
  };
};

export const setOrderDetailRefreshImmediate = () => {
  return {
    type: SET_ORDER_DETAIL_REFRESH_IMMEDIATE,
  };
};

export const resetOrderDetailRefresh = () => {
  return {
    type: RESET_ORDER_DETAIL_REFRESH,
  };
};
