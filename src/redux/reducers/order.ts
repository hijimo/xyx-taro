import { produce } from "immer";
import { INIT_NEW_ORDER, CHANGE_NEW_ORDER_ADDRESS } from "../constants/order";
import { NewOrder } from "@/types";

export interface OrderState {
  newOrder: NewOrder;
}

const getInitialState = () =>
  ({
    newOrder: {
      type: 1,
      shopGoods: [],
      address: null,
    },
  } as OrderState);

const user = produce((draftState, action) => {
  switch (action.type) {
    case INIT_NEW_ORDER:
      draftState.newOrder = {
        ...getInitialState().newOrder,
        ...action.payload,
      };
      break;
    case CHANGE_NEW_ORDER_ADDRESS:
      draftState.newOrder.address = action.payload;
      break;
  }
}, getInitialState());

export default user;
