import { produce } from "immer";
import { setStorageSync, navigateTo } from "@tarojs/taro";
import { StorageKeyEnum } from "@/enums";
import {
  FETCH_CURRENT,
  UPDATE_USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
} from "../constants/user";
import { UserSSD } from "@/types/User";

export interface UserModelState {
  currentUser: UserSSD | null;
}

const getInitialState = () =>
  ({
    currentUser: null,
  } as UserModelState);

const user = produce((draftState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      draftState.currentUser = { ...draftState.currentUser, ...action.payload };
      break;
    case FETCH_CURRENT:
      draftState.currentUser = action.payload;
      break;
    case USER_LOGIN:
      const { accessToken, userInfo } = action.payload;
      const newToken = `Bearer${accessToken}`;
      setStorageSync(StorageKeyEnum.TOKEN_KEY, newToken);
      setStorageSync(StorageKeyEnum.USER_INFO, action.payload);

      draftState.currentUser = {
        userInfo,
      };
      break;
    case USER_LOGOUT:
      setStorageSync(StorageKeyEnum.TOKEN_KEY, "");
      setStorageSync(StorageKeyEnum.USER_INFO, "");
      draftState.currentUser = {
        userInfo: null,
      };
      navigateTo({ url: "/pages/users/login/index" });
      break;
  }
}, getInitialState());

export default user;
