import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { View } from "@tarojs/components";
import { UserSSD } from "@/types/User";
import { asyncUpdateUserInfo } from "@/redux/actions/user";
import H from "@/components/H";
import defaultAvatar from "@/assets/default-avatar.png";
import { getUserInfo } from "@/utils/authorize";
import Avatar from "./Avatar";
import styles from "./UserInfo.module.less";

interface UserInfoProps {}

// 缓存currentUesr的过程
// 在props或state 更新时也不会再去计算currentUser
// 只有在 redux状态更新才会更新计算
const selectUserInfoOfUser = createSelector(
  (state: any) => state.user,
  (user) => {
    return user.currentUser;
  }
);

const UserInfo: React.FC<UserInfoProps> = () => {
  const dispatch = useDispatch();
  const userInfo: UserSSD = useSelector(selectUserInfoOfUser);

  const handleClick = useCallback(async () => {
    // if (!userInfo.avatar) {
    // const user = await getUserInfo();
    // Promise.all([dispatch(asyncUpdateUserInfo(user))]);
    // }
    //
  }, [userInfo]);

  return (
    <View className={styles.userInfo} onClick={handleClick}>
      {/* <Avatar src={userInfo?.avatar || defaultAvatar} />
      <H size="h1" className={styles.h1}>
        {userInfo?.nickName || "点击登录"}
      </H> */}
      <Avatar src={defaultAvatar} />
      <H size="h1" className={styles.h1}>
        微信用户
      </H>
    </View>
  );
};

export default UserInfo;
