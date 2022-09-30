import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from "@tarojs/taro";

export interface SystemInfoWithNavBar extends getSystemInfoSync.Result {
  navBarHeight: number;
  navBarExtendHeight: number;
  capsulePosition: getMenuButtonBoundingClientRect.Rect;
  isIOS: boolean;
}

const getSystemInfoWithNavBar: () => SystemInfoWithNavBar = () => {
  const systemInfo = getSystemInfoSync();

  const isDevtoolsIOS = systemInfo.system.toLowerCase().includes("ios");

  //开启wifi的情况下修复statusBarHeight值获取不到
  const statusBarHeight =
    systemInfo.statusBarHeight ||
    systemInfo.screenHeight - systemInfo.windowHeight - 20;

  const getGapAndWidth: () => [number, number] = () => {
    if (systemInfo.platform === "android") {
      return [8, 96];
    } else if (systemInfo.platform === "devtools") {
      if (isDevtoolsIOS) {
        return [5.5, 96]; //开发工具中ios手机
      } else {
        return [7.5, 96]; //开发工具中android和其他手机
      }
    } else {
      return [4, 88];
    }
  };

  const getCapsuleRect: () => getMenuButtonBoundingClientRect.Rect = () => {
    let rect;
    try {
      rect = getMenuButtonBoundingClientRect?.();
      if (
        rect === undefined ||
        rect === null ||
        !rect.width ||
        !rect.top ||
        !rect.left ||
        !rect.height
      ) {
        throw new Error("getMenuButtonBoundingClientRect error");
      }
    } catch (error) {
      // 获取不到的情况下 自定义一个
      const gapAndWidth = getGapAndWidth();
      return {
        bottom: statusBarHeight + gapAndWidth[0] + 32,
        height: 32,
        left: systemInfo.windowWidth - gapAndWidth[1] - 10,
        right: systemInfo.windowWidth - 10,
        top: statusBarHeight + gapAndWidth[0],
        width: gapAndWidth[1],
      };
    }

    return rect;
  };

  const capsuleRect = getCapsuleRect();

  const getNavBarHeightAndExtendHeight: () => [number, number] = () => {
    if (!systemInfo.statusBarHeight) {
      const navBarHeight =
        2 * (capsuleRect.top - statusBarHeight) + capsuleRect.height;
      return [navBarHeight, 0];
    } else {
      const navBarHeight =
        systemInfo.statusBarHeight +
        2 * (capsuleRect.top - systemInfo.statusBarHeight) +
        capsuleRect.height;
      if (isDevtoolsIOS) {
        return [navBarHeight, 4];
      } else {
        return [navBarHeight, 0];
      }
    }
  };

  const navBarHeightAndExtendHeight = getNavBarHeightAndExtendHeight();

  return {
    ...systemInfo,
    navBarHeight: navBarHeightAndExtendHeight[0],
    navBarExtendHeight: navBarHeightAndExtendHeight[1],
    capsulePosition: capsuleRect,
    isIOS: isDevtoolsIOS,
  };
};

export default getSystemInfoWithNavBar;
