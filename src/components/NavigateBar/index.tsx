import React, { useState } from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import {
  getCurrentPages,
  navigateBack,
  switchTab,
  useDidShow,
} from "@tarojs/taro";
import getSystemInfoWithNavBar from "./utils";
import styles from "./index.module.less";

export interface NavigateBarProps {
  className?: string;
  title?: string;
  background?: string;
  backgroundColorTop?: string;
  buttonsBarBackground?: string;
  color?: string;
  delta?: number;
  iconTheme?: "black" | "white";
  back?: boolean;
  home?: boolean;
  searchBar?: boolean;
  searchText?: string;
  onHome?: () => never;
  onBack?: () => never;
  onSearch?: () => never;
  renderLeft?: () => React.ReactNode;
  renderCenter?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
}

const iconThemeMap = {
  white: styles.white,
  black: styles.black,
};

const NavigateBar: React.FC<NavigateBarProps> = ({
  className = "",
  title = "",
  background = "#e70202",
  backgroundColorTop = "#f6f6fb",
  color = "#fff",
  delta = 1,
  iconTheme = "black",
  back = false,
  home = false,
  searchBar = false,
  searchText = "搜索好物",
  buttonsBarBackground,
  onHome,
  onBack,
  onSearch,
  renderLeft,
  renderCenter,
  renderRight,
}) => {
  const [systemInfoWithNavBar, setSystemInfoWithNavBar] = useState(
    getSystemInfoWithNavBar
  );

  const {
    statusBarHeight,
    navBarHeight,
    capsulePosition,
    navBarExtendHeight,
    isIOS,
    windowWidth,
  } = systemInfoWithNavBar;
  const rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
  const leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距

  const getNavBarLeftStyle = () => {
    if ((back && !home) || (!back && home)) {
      return [
        `width: ${capsulePosition.width}px`,
        `height: ${capsulePosition.height}px`,
        `margin-left: 0`,
        `margin-right: -${capsulePosition.width / 2 + rightDistance}px`,
      ].join(";");
    } else if ((back && home) || title) {
      return [
        `width: ${capsulePosition.width}px`,
        `height: ${capsulePosition.height}px`,
        `margin-left: ${rightDistance}px`,
      ].join(";");
    }
    return [`width: auto`, `margin-left: 0`].join(";");
  };

  const navigationbarinnerStyle = [
    `color: ${color}`,
    //`background:${background}`,
    `height: ${navBarHeight + navBarExtendHeight}px`,
    `padding-top: ${statusBarHeight}px`,
    `padding-right: ${leftWidth}px`,
    `padding-bottom:$ {navBarExtendHeight}px`,
  ].join(";");

  const navBarLeftStyle = getNavBarLeftStyle();

  const getNavBarCenter = () => {
    if (title) {
      return <Text className={styles.title}>{title}</Text>;
    } else if (searchBar) {
      return (
        <View
          className={styles.search}
          style={`height: ${capsulePosition.height}px;`}
          onClick={handleSearchClick}
        >
          <View className={styles.icon} />
          <View className={styles.input}>{searchText}</View>
        </View>
      );
    } else {
      return renderCenter?.();
    }
  };

  useDidShow(() => {
    if (isIOS) {
      setSystemInfoWithNavBar(getSystemInfoWithNavBar());
    }
  });

  const handleGoHomeClick = () => {
    if (onHome) {
      onHome?.();
    } else {
      switchTab({
        url: "/pages/index/index",
      });
    }
  };

  const handleSearchClick = () => {
    onSearch?.();
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack?.();
    } else {
      const pages = getCurrentPages();
      if (pages.length >= 2) {
        navigateBack({
          delta,
        });
      } else {
        switchTab({
          url: "/pages/index/index",
        });
      }
    }
  };

  return (
    <View
      className={classNames([
        styles.navBar,
        isIOS ? styles.ios : styles.android,
        className,
      ])}
      style={`background: ${
        backgroundColorTop ? backgroundColorTop : background
      };height:${navBarHeight + navBarExtendHeight}px;`}
    >
      <View
        className={classNames([styles.placeholder])}
        style={`padding-top: ${navBarHeight + navBarExtendHeight}px;`}
      />
      <View
        className={classNames([styles.inner])}
        style={`background:${background};${navigationbarinnerStyle};`}
      >
        <View className={styles.left} style={navBarLeftStyle}>
          {back && !home && (
            <View
              onClick={handleBackClick}
              className={classNames([
                styles.button,
                styles.goBack,
                iconThemeMap[iconTheme],
              ])}
            />
          )}
          {!back && home && (
            <View
              onClick={handleGoHomeClick}
              className={classNames([
                styles.button,
                styles.goHome,
                iconThemeMap[iconTheme],
              ])}
            />
          )}
          {back && home && (
            <View
              className={classNames([styles.buttons])}
              style={{
                background: buttonsBarBackground,
              }}
            >
              <View
                onClick={handleBackClick}
                className={classNames([
                  styles.button,
                  styles.goBack,
                  iconThemeMap[iconTheme],
                ])}
              />
              <View
                onClick={handleGoHomeClick}
                className={classNames([
                  styles.button,
                  styles.goHome,
                  iconThemeMap[iconTheme],
                ])}
              />
            </View>
          )}
          {!back && !home && renderLeft?.()}
        </View>
        <View
          className={styles.center}
          style={`padding-left: ${rightDistance}px`}
        >
          {getNavBarCenter()}
        </View>
        <View
          className={styles.right}
          style={`margin-right: ${rightDistance}px`}
        >
          {renderRight?.()}
        </View>
      </View>
    </View>
  );
};

export default React.memo(NavigateBar);
