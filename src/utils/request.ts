import {
  request as taroRequest,
  showToast,
  setStorageSync,
  getStorageSync,
} from "@tarojs/taro";
import TaroTypes from "@tarojs/taro/types";
import _includes from "lodash/includes";
import { getTokenByCode } from "@/services/user";
import { wxLogin } from "@/utils/authorize";

type RequestOption = Omit<TaroTypes.request.Option, "url">;

// const API_ORIGIN = 'https://yada.jasoncui.online';

// const API_ORIGIN = 'https://bdxz.bettapharma.com';
const API_ORIGIN = "http://123.57.108.243:8060";

// const API_ORIGIN = 'http://192.168.0.12:8106';

const TOKEN_KEY = "token";

const LOGIN_TIME_LIMIT = 2;

const NO_LOGIN_CODE = "0001007";

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
  if (token === "") {
    const code = await wxLogin();
    // 这里要防止死循环 getTokenByCode使用了request2 通过NO_TOKEN标志

    const data: any = await getTokenByCode(code);

    const newToken = data.data.token;
    setStorageSync(TOKEN_KEY, newToken);
    return newToken;
  }

  return token;
};

const getAccessTokenObject = (() => {
  let resetToken = () => {};
  let generateReset = () => {
    let isUsed = false;
    return () => {
      if (!isUsed) {
        isUsed = true;
        setStorageSync(TOKEN_KEY, "");
        accessTokenPromise = generateAccessTokenPromise();
        resetToken = generateReset();
      }
    };
  };

  let accessTokenPromise = generateAccessTokenPromise();
  resetToken = generateReset();

  return () => ({
    accessTokenPromise,
    resetToken,
  });
})();

const interceptorResponse = async <T = any>(
  response: TaroTypes.request.SuccessCallbackResult<any>
): Promise<T> => {
  const { data, statusCode } = response;

  if (statusCode !== 200) {
    throw new Error(codeMessage[statusCode] || "网络异常");
  } else {
    const { code, msg, retCode } = data || {};
    const success = code === 200;
    const retMsg = msg;
    if (data && !success) {
      if (retCode === NO_LOGIN_CODE) {
        throw { type: "NO_LOGIN", message: retMsg };
      }
      throw { message: retMsg };
    }
  }
  return data;
};

const request = async <T = any>(path: string, option?: RequestOption) => {
  const finalOption = { ...defaultOption, ...option };
  const NO_TOKEN = finalOption["NO_TOKEN"];

  for (let loginTimes = 0; loginTimes < LOGIN_TIME_LIMIT; loginTimes++) {
    const { accessTokenPromise, resetToken } = getAccessTokenObject();
    try {
      const ACCESS_TOKEN = NO_TOKEN ? undefined : await accessTokenPromise;

      const header = {
        // 微信小程序，会把值为undefined的参数处理成  Authorization: [Object undefined]
        // 而不是web端的去掉这个参数。
        Authorization: ACCESS_TOKEN,
        ...finalOption.header,
      };
      if (!ACCESS_TOKEN) {
        delete header.Authorization;
      }

      const response = await taroRequest({
        url: `${API_ORIGIN}${path}`,
        ...finalOption,
        header,
      });

      const data = await interceptorResponse<T>(response);

      return data;
    } catch (err) {
      // 收到没有登录的消息才需要重试
      const { type, message } = err;

      if (type !== "NO_LOGIN" || loginTimes === LOGIN_TIME_LIMIT - 1) {
        showToast({
          title: message,
          icon: "none",
          duration: 3500,
        });

        throw err;
      }
      resetToken();
    }
  }
};

export default request;
