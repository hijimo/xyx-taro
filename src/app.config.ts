export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/my/index",
    "pages/adventure/detail/index",
    "pages/adventure/go/index",
    "pages/chapter/index",
    "pages/chapter/result/index",
    "pages/reward/index",
    "pages/reward/final/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#333333",
    selectedColor: "#D23E40",
    backgroundColor: "#FFFFFF",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "寻宝",
        iconPath: "assets/tabBar/icon-tab-index.png",
        selectedIconPath: "assets/tabBar/icon-tab-index-selected.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "assets/tabBar/icon-tab-my.png",
        selectedIconPath: "assets/tabBar/icon-tab-my-selected.png",
      },
    ],
  },
});
