import { UploadTask, setStorageSync, getStorageSync } from "@tarojs/taro";
import { getOssSign } from "@/services/common";

const KEY_UPLOAD_SIGN = "__upload_sign_object";

const genKey = (dir: string, filename: string) => {
  const dt = new Date();
  return `${dir}/${dt.getFullYear()}${dt.getMonth() + 1}/${filename}`;
};
const genFileUrl = (host: string, key: string) => {
  return `${host}/${key}`;
};
const defaultHeaders = () => ({
  "Cache-Control": "max-age=31536000"
  // "Content-Disposition": `filename="${filename}"`
});

const assignHeaders = headers => Object.assign({}, headers, defaultHeaders());

export interface ISuccessResponse {
  data: string;
  statusCode: number;
}
export interface IUploadOption {
  url?: string;
  name?: string;
  header?: any;
  formData?: any;
  timeout?: number;
  // fileUrl 文件上传成功后得到的url

  onProgress?: (progress: number) => void;
  // 当某个文件上传出错
  onError?: (msg?: string) => void;
  // 当某个文件上传完成
  onSuccess?: (res: ISuccessResponse, fileUrl?: string) => void;

  complete?: () => void;
  filePath: string;
}

export interface IUploader {}

class Uploader {
  xhr: UploadTask;
  headers: any;
  sign: any;
  constructor() {}

  async getUploadSignInfo() {
    const sign = this.sign || getStorageSync(KEY_UPLOAD_SIGN);
    // 以秒为单位
    if (sign) {
      const t = Math.floor(new Date().valueOf() / 1000) + 30 * 60;
      if (sign.creator + sign.duration >= t) {
        return sign;
      }
    }

    const { success, data, retMsg }: any = await getOssSign();

    if (success) {
      data.creator = Math.floor(new Date().valueOf() / 1000);
      setStorageSync(KEY_UPLOAD_SIGN, data);
      return data;
    }
    // 如果获取证书失败，直接返回文件上传失败
    throw Error(`获取证书失败：${retMsg}`);
  }

  async upload(option: IUploadOption) {
    this.sign = await this.getUploadSignInfo();

    if (this.sign) {
      const {
        header,
        formData,
        filePath,
        onSuccess,
        onError,
        onProgress
      } = option;
      const headers = this.getHeaders(header);
      const data = this.getFormData(filePath, formData);
      const { host } = this.sign;

      const progressCB = ({ progress }) => {
        if (onProgress) {
          onProgress(progress);
        }
      };
      this.xhr = wx.uploadFile({
        name: "file",
        url: host,
        ...option,
        header: headers,
        formData: data,
        success: (res: ISuccessResponse) => {
          if (onSuccess) {
            onSuccess(res, data.fileUrl);
          }
        },
        fail: () => {
          if (onError) {
            onError();
          }
        },
        complete: () => {
          // 终止进度条监听
          if (this.xhr) {
            this.xhr.offProgressUpdate(progressCB);
          }
        }
      });
      this.xhr.onProgressUpdate(progressCB);
    } else {
      // message.error('file upload fail');
    }
  }

  getHeaders = (userHeaders: any) => assignHeaders(userHeaders);
  getFormData(filePath: string, formData?: any) {
    const {
      accessKeyId: OSSAccessKeyId,
      dir,
      policy,
      signature,
      host
    } = this.sign;
    const filename = filePath.split("/").pop() || "";
    const key = genKey(dir, filename);
    const oss = {
      OSSAccessKeyId,
      success_action_status: "200",
      policy,
      signature,
      key
    };
    // 用来返回成功url
    const others = {
      fileUrl: genFileUrl(host, key)
    };

    return Object.assign({}, formData || {}, oss, others);
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

export default Uploader;
