import {
  getSetting,
  authorize as taroAuthorize,
  getUserProfile as taroGetUserInfo,
  login,
  getLocation as taroGetLocation,
} from "@tarojs/taro";

export enum ScopeEnums {
  userInfo = "scope.userInfo", // 是否授权用户信息，对应接口 wx.getUserInfo

  location = "scope.userLocation", // 是否授权地理位置，对应接口 wx.getLocation, wx.chooseLocation
  address = "scope.address", // 是否授权通讯地址，对应接口 wx.chooseAddress
  invoiceTitle = "scope.invoiceTitle", // 是否授权发票抬头，对应接口 wx.chooseInvoiceTitle
  invoice = "scope.invoice", // 是否授权获取发票，对应接口 wx.chooseInvoice
  werun = "scope.werun", // 是否授权微信运动步数，对应接口 wx.getWeRunData
  record = "scope.record", // 是否授权录音功能，对应接口 wx.startRecord
  writePhotosAlbum = "scope.writePhotosAlbum", // 是否授权保存到相册 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
  camera = "scope.camera", // 是否授权摄像头，对应[camera]((camera)) 组件
}

// 微信登录，获取一次性临时code
export async function wxLogin() {
  const result = await login();
  if (!result.code) {
    throw new Error("wx login no code");
  }
  return result.code;
}

//判断是否授权了用户信息
export async function isAuthorizationUserInfo() {
  const hasAuthorize = await checkAuthorize(ScopeEnums.userInfo);
  if (!hasAuthorize) {
    throw new Error("no authorize");
  }
  const userInfo = await taroGetUserInfo({
    desc: "为了向您的好友展示您的头像和昵称",
  });
  return userInfo;
}

// 判断是否授权了某个权限
export async function checkAuthorize(scope: string) {
  const result = await getSetting();
  const setting = result.authSetting;
  return !!setting[scope];
}

// 申请某一个权限
export async function authorize(scope: string) {
  const hasAuthorize = await checkAuthorize(scope);
  if (!hasAuthorize) {
    await taroAuthorize({ scope });
  }
}

export async function getUserInfo() {
  await authorize(ScopeEnums.userInfo);
  const userInfo = await taroGetUserInfo({
    desc: "为了向您的好友展示您的头像和昵称",
  });
  return userInfo;
}

// 获取地理位置
export async function getLocation() {
  await authorize(ScopeEnums.location);
  const location = await taroGetLocation({ type: "gcj02" });
  return location;
}
