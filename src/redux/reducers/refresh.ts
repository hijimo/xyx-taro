import { produce } from 'immer';
import {
  SET_ORDER_LIST_REFRESH,
  SET_ORDER_LIST_REFRESH_IMMEDIATE,
  RESET_ORDER_LIST_REFRESH,

  SET_ORDER_DETAIL_REFRESH,
  SET_ORDER_DETAIL_REFRESH_IMMEDIATE,
  RESET_ORDER_DETAIL_REFRESH
} from '../constants/refresh';
import { RefreshOption } from '@/types';

export interface OrderState {
  orderList: RefreshOption;
  orderDetail: RefreshOption;
}

const getInitialState = () =>
  ({
    orderList: {
      needRefresh: false,
      immediate: false,
    },
    orderDetail: {
      needRefresh: false,
      immediate: false,
    },
  } as OrderState);

const refresh = produce((draftState: OrderState, action) => {
  switch (action.type) {
    case SET_ORDER_LIST_REFRESH:
      draftState.orderList.needRefresh = true;
      draftState.orderList.immediate = false;
      break;
    case SET_ORDER_LIST_REFRESH_IMMEDIATE:
      draftState.orderList.needRefresh = true;
      draftState.orderList.immediate = true;
      break;
    case RESET_ORDER_LIST_REFRESH:
      draftState.orderList.needRefresh = false;
      draftState.orderList.immediate = false;
      break;

      case SET_ORDER_DETAIL_REFRESH:
        draftState.orderDetail.needRefresh = true;
        draftState.orderDetail.immediate = false;
        break;
      case SET_ORDER_DETAIL_REFRESH_IMMEDIATE:
        draftState.orderDetail.needRefresh = true;
        draftState.orderDetail.immediate = true;
        break;
      case RESET_ORDER_DETAIL_REFRESH:
        draftState.orderDetail.needRefresh = false;
        draftState.orderDetail.immediate = false;
        break;
  }
}, getInitialState());

export default refresh;
