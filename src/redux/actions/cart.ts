import {
  CheckedCartGoods,
  CartGoodsSSD,
  CanteenCartGoodsSSD,
} from '@/types/Cart';
import {
  getCartData,
  updateCartGoodsQuantity,
  ChangeGoodsQuantityData,
  removeCartGoods,
} from '@/services/carts';
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

// 食堂购物车

/**
 * 更新食堂购物车数量
 * @param goodsId  商品id
 * @param quantity 数量
 * @returns
 */
export const changeCanteenCartGoodsQuantity = (
  goodsId: number | string,
  quantity: number
) => {
  return {
    type: UPDATE_CANTEEN_CART_GOODS_QUANTITY,
    payload: {
      goodsId,
      quantity,
    },
  };
};

/**
 * 选中商品数据
 * @param data 商品数据
 * @returns
 */
export const changeCanteenCartCheckedGoods = (data: CanteenCartGoodsSSD) => {
  return {
    type: UPDATE_CANTEEN_CART_GOODS,
    payload: data,
  };
};

/**
 * 清除食堂购物车数据
 * @returns
 */
export const clearCanteenCartCheckedData = () => {
  return {
    type: CLEAR_CANTEEN_CART_GOODS,
  };
};
/**
 * 删除食堂购物车中的某个商品
 * @param goodsId  商品id
 * @returns
 */
export const deleteCanteenCartGoods = (goodsId: number | string) => {
  return {
    type: REMOVE_CANTEEN_CART_GOODS,
    payload: goodsId,
  };
};

// 购物车
export const fetchCartData = () => {
  return async (dispatch) => {
    const result = await getCartData({ pageNo: 1, pageSize: 1000 });
    dispatch({
      type: FETCH_CART_DATA_SUCCESS,
      payload: result.data,
    });
  };
};

export const changeCartGoodsQuantity = (data: ChangeGoodsQuantityData) => {
  return async (dispatch) => {
    await updateCartGoodsQuantity(data);
    dispatch({
      type: UPDATE_CART_GOODS_QUANTITY,
      payload: data,
    });
  };
};

export const changeCartCheckedShop = (data: string | null) => {
  return {
    type: UPDATE_CART_CHECKED_SHOP,
    payload: data,
  };
};

export const changeCartCheckedGoods = (data: CheckedCartGoods) => {
  return {
    type: UPDATE_CART_CHECKED_GOODS,
    payload: data,
  };
};
export const selectedAllCartGoods = ()=>{
  return {
    type: SELECT_ALL_CART_GOODS,
    payload: null,
  };
}

export const clearCartCheckedData = () => {
  return {
    type: CLEAR_CART_CHECKED_DATA,
  };
};

export const deleteCartGoods = (data: { shopId: string; idList: string }) => {
  return async (dispatch) => {
    await removeCartGoods(data.idList);
    dispatch({
      type: REMOVE_CART_GOODS,
      payload: data,
    });
  };
};
