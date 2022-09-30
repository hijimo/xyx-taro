import Taro, {
  request as taroRequest,
  showToast,
  getStorageSync,
  addInterceptor,
  navigateTo,
} from "@tarojs/taro";
import { StorageKeyEnum } from "@/enums";
import TaroTypes from "@tarojs/taro/types";
import _includes from "lodash/includes";

type RequestOption = Omit<TaroTypes.request.Option, "url">;

// const API_ORIGIN = "https://apollo.jasoncui.online";
const API_ORIGIN = "https://apollo.jasoncui.online";

// const API_ORIGIN = "http://192.168.110.240:8113";

export const TOKEN_KEY = StorageKeyEnum.TOKEN_KEY;

const NO_LOGIN_CODE = "0001007";
let NO_LOGIN = false;

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const defaultOption: RequestOption = {
  jsonpCache: false,
  method: "GET",
  mode: "same-origin", // "no-cors" or "cors" or "same-origin"
  credentials: "include", // "same-origin" or "include" or "omit"
  cache: "default", // "default" or "no-cache" or "reload" or "force-cache" or "only-if-cached"
  timeout: 5000,
  retryTimes: 2,
};

const generateAccessTokenPromise = async () => {
  const token = getStorageSync(TOKEN_KEY);

  return token;
};

const interceptorResponse = async <T = any>(
  response: TaroTypes.request.SuccessCallbackResult<any>
): Promise<T> => {
  const { data, statusCode } = response;

  if (statusCode !== 200) {
    throw new Error(codeMessage[statusCode] || "网络异常");
  } else {
    const { success, retMsg, retCode } = data || {};
    if (data && !success) {
      if (retCode === NO_LOGIN_CODE) {
        throw { type: "NO_LOGIN", message: retMsg };
      }
      throw { message: retMsg };
    }
  }
  return data;
};
const interceptorRequest = (chain) => {
  const requestParams = chain.requestParams;

  if (NO_LOGIN) {
    // 1.放弃此次请求
    const p = chain.proceed(requestParams);
    p.abort();
    return p;
    // 2.请求终止后会进入catch
    // 3. catch 里处理 abort 发起重登录
    // 4. 写得这么别扭是因为taro目前还不支持异步的Request拦截器
  }
  return chain.proceed(requestParams);
};

const request = async <T = any>(path: string, option?: RequestOption) => {
  const finalOption = { ...defaultOption, ...option };
  const NO_TOKEN = finalOption["NO_TOKEN"];

  try {
    const ACCESS_TOKEN = NO_TOKEN
      ? undefined
      : await generateAccessTokenPromise();
    const response = await taroRequest({
      url: `${API_ORIGIN}${path}`,
      ...finalOption,
      header: { Authorization: ACCESS_TOKEN, ...finalOption.header },
    });
    const data = await interceptorResponse<T>(response);
    return data;
  } catch (err) {
    // 收到没有登录的消息跳到登录页
    const { type, message } = err;
    console.log("message", message);

    if (type !== "NO_LOGIN") {
      showToast({
        title: message,
        icon: "none",
        duration: 3500,
      });
      throw err;
    } else if (type === "NO_LOGIN") {
      if (NO_LOGIN === false) {
        NO_LOGIN = true;
        navigateTo({ url: "/pages/users/login/index" });
        // 重置no_login
        setTimeout(() => {
          NO_LOGIN = false;
        }, 1500);
      }

      //
      throw err;
    }
  }
};
addInterceptor(Taro.interceptors.logInterceptor);
addInterceptor(Taro.interceptors.timeoutInterceptor);
addInterceptor(interceptorRequest);

export default request;
