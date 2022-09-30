import { Address } from '@/types/Address';
import { NewOrder } from "@/types/Order";
import { CHANGE_NEW_ORDER_ADDRESS, INIT_NEW_ORDER } from '../constants/order';

export const changeNewOrderAddress = (address: Address) => {
  return {
    type: CHANGE_NEW_ORDER_ADDRESS,
    payload: address,
  };
};

export const initNewOrder = (newOrder: Partial<NewOrder>) => {
  return {
    type: INIT_NEW_ORDER,
    payload: newOrder,
  };
};
