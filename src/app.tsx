import { Component } from "react";
import { Provider } from "react-redux";
import "core-js/features/promise/finally";
// import Taro from "@tarojs/taro";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/utils/systemInfo"; // 同步阻塞方法提前引入以尽快执行防止后面卡屏
import configStore from "./redux/store";
import { fetchCurrent } from "./redux/actions/user";
import "./app.less";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const store = configStore();

// 获取用户信息
store.dispatch(fetchCurrent() as any);

// 错误跟踪
// let uma = {};
// if (process.env.TARO_ENV === "weapp") {
//   uma = require("umtrack-wx");
//   uma.init({
//     appKey: "602b4d0c668f9e17b8af8d05",
//     useOpenid: false,
//     autoGetOpenid: false,
//     debug: true,
//   });
// }
// Taro.uma = uma;

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{this.props.children}</Provider>
      </QueryClientProvider>
    );
  }
}

export default App;
