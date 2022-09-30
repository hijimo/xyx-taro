import { produce } from 'immer';
import {
  CartGoodsSSD,
  CanteenCartGoodsSSD,
  CartInfoSSD,
  CheckedCartData,
  CheckedCartGoods,
} from '@/types/Cart';

import {
  FETCH_CART_DATA_SUCCESS,
  UPDATE_CART_GOODS_QUANTITY,
  UPDATE_CART_CHECKED_SHOP,
  UPDATE_CART_CHECKED_GOODS,
  SELECT_ALL_CART_GOODS,
  CLEAR_CART_CHECKED_DATA,
  REMOVE_CART_GOODS,
  UPDATE_CANTEEN_CART_GOODS,
  CLEAR_CANTEEN_CART_GOODS,
  REMOVE_CANTEEN_CART_GOODS,
  UPDATE_CANTEEN_CART_GOODS_QUANTITY,
} from '../constants/cart';

export interface OrderState {
  cartData: CartInfoSSD | null;
  checkedCartData: CheckedCartData;
  canteenGoods: CanteenCartGoodsSSD[];
}

const getInitialState = () =>
  ({
    cartData: null,
    checkedCartData: {
      shop: null,
      goods: [],
    },
    canteenGoods: [],
  } as OrderState);

const cart = produce((draftState, action) => {
  switch (action.type) {
    // 食堂购物车
    case UPDATE_CANTEEN_CART_GOODS:
      // action.payload
      const canteenGoodsIdx = draftState.canteenGoods.findIndex(
        (it) => it.id === action.payload.id
      );
      if (canteenGoodsIdx >= 0) {
        draftState.canteenGoods[canteenGoodsIdx].goodsNum += 1;
      } else {
        draftState.canteenGoods = [
          ...draftState.canteenGoods,
          {
            ...action.payload,
            goodsNum: 1,
          },
        ];
      }
      break;
    case REMOVE_CANTEEN_CART_GOODS:
      const removeIdx = draftState.canteenGoods.findIndex(
        (it) => it.id === action.payload
      );
      if (removeIdx >= 0) {
        draftState.canteenGoods.splice(removeIdx, 1);
      }
      break;
    case UPDATE_CANTEEN_CART_GOODS_QUANTITY:
      const { goodsId, quantity } = action.payload;
      const updateQuantityIdx = draftState.canteenGoods.findIndex(
        (it) => it.id === goodsId
      );
      if (updateQuantityIdx >= 0) {
        draftState.canteenGoods[updateQuantityIdx].goodsNum = quantity;
      }
      break;
    case CLEAR_CANTEEN_CART_GOODS:
      draftState.canteenGoods = [];
      break;
    // 购物车
    case FETCH_CART_DATA_SUCCESS:
      draftState.cartData = {
        companyGroupDtos: action.payload.records || [],
        goodsCount: action.payload.totalCount || 0,
      };
      break;

    case CLEAR_CART_CHECKED_DATA:
      draftState.checkedCartData = getInitialState().checkedCartData;
      break;

    case UPDATE_CART_GOODS_QUANTITY:
      const carts = draftState.cartData.companyGroupDtos;

      const idx = carts?.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (idx !== -1) {
        draftState.cartData.companyGroupDtos[idx].goodsNum =
          action.payload.goodsNum;
      }

      break;

    case UPDATE_CART_CHECKED_SHOP:
      const nextShop: string | null = action.payload;
      draftState.checkedCartData.shop = nextShop;
      if (nextShop === null) {
        draftState.checkedCartData.goods = [];
      } else {
        const shopIndex = draftState.cartData.companyGroupDtos.findIndex(
          (store) => store.storeId === nextShop
        );
        if (shopIndex !== -1) {
          draftState.checkedCartData.goods =
            draftState.cartData.companyGroupDtos[shopIndex].goodsInfoDtos.map(
              (goods) => goods.id
            );
        }
      }
      break;

    case UPDATE_CART_CHECKED_GOODS:
      const { nextGoods, nextShop: goodsShop }: CheckedCartGoods =
        action.payload;
      draftState.checkedCartData.goods = nextGoods;
      if (nextGoods.length === 0) {
        draftState.checkedCartData.shop = null;
      } else if (draftState.checkedCartData.shop === null) {
        draftState.checkedCartData.shop = goodsShop;
      }
      break;
    case SELECT_ALL_CART_GOODS:
      
    
      draftState.checkedCartData.goods = draftState.cartData?.companyGroupDtos?.map(it=>`${it.id}`);
      break;

    case REMOVE_CART_GOODS: {
      const { idList } = action.payload;

      idList.forEach(id => {
        const goodsIndex = draftState.cartData.companyGroupDtos.findIndex(
            (cartItem) => {
              return id === cartItem.id;
            }
        );
        if (goodsIndex !== -1) {
          draftState.cartData.companyGroupDtos.splice(goodsIndex, 1);
        }
        // 删除选中的数据 如果删除之后store为空 将选中的store置空
        const checkGoodsIndex = draftState.checkedCartData.goods.findIndex(
            (cartId) => id === cartId
        );
        if (checkGoodsIndex !== -1) {
          draftState.checkedCartData.goods.splice(checkGoodsIndex, 1);
        }
      });
      break;
    }
  }
}, getInitialState());

export default cart;
