import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import classNames from "classnames";
import _debounce from "lodash/debounce";
import { Image, View } from "@tarojs/components";
import Icon from "@/components/Icon";
import Uploader, { ISuccessResponse } from "@/utils/Uploader";
import { isImage, isVideo, getFileIcon } from "@/utils/file";

import type { File } from "@/types";
import { FileUploadStateEnums } from "@/enums";
import styles from "./Upload.module.less";

export interface UploadProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 是否可以删除
   */
  canDelete?: boolean;
  /**
   * 是否手动上传
   */
  manual?: boolean;
  // 服务器接收file的字段名
  name?: string;
  // 额外的post data数参
  data?: any;
  // 上传中
  onProgress?: (progress: number, file: File) => void;
  onPreview?: (file: File) => void;
  // 当某个文件上传出错
  onError?: (file: File, msg?: string) => void;
  // 当某个文件上传完成
  onSuccess?: (res: ISuccessResponse, fileUrl: string, file: File) => void;
  onRemove?: (e, file: File) => void;
}
export interface RefUploadProps {
  upload: () => void;
  getUid: () => string;
}
interface UploadPropsExt extends UploadProps {
  file: File;
}

export const getPreviewUrl = (file: File) => {
  const { name, url } = file;
  let previewUrl = "";

  const filename = name || url;

  if (isImage(filename)) {
    previewUrl = filename.split("?")[0] || "";
  } else {
    previewUrl = filename;
  }
  return previewUrl;
};
export const getThumUrl = (file: File) => {
  const { name, url } = file;
  let thumbUrl = "";

  const filename = name || url;
  if (isImage(filename)) {
    if (url && url.includes("x-oss-process")) {
      return url;
    } else if (url) {
      thumbUrl = `${url}?x-oss-process=image/resize,m_mfit,h_400`;
    } else if (!url && file.tmpUrl) {
      // 图片上传不再显示缩略图，因为原图一张大概5M
      // 如果显示5、6十张，内存会很夸张
      // thumbUrl = file.tmpUrl;
      thumbUrl = "";
    }
  } else if (isVideo(filename)) {
    if (url?.includes("?")) {
      thumbUrl = `${url}&x-oss-process=video/snapshot,t_0,f_jpg,w_400,h_400,m_fast`;
    } else {
      thumbUrl = `${url}?x-oss-process=video/snapshot,t_0,f_jpg,w_400,h_400,m_fast`;
    }
  } else {
    thumbUrl = getFileIcon(filename);
  }

  return thumbUrl;
};

const InternalUpload = (
  {
    className,
    name = "file",
    data,
    style,
    file,
    canDelete = true,
    manual = false,
    onProgress,
    onRemove,
    onSuccess,
    onError,
    onPreview,
  }: UploadPropsExt,
  ref: React.Ref<RefUploadProps>
) => {
  const [status, setStatus] = useState<FileUploadStateEnums>(
    file.status || FileUploadStateEnums.Initial
  );
  const uploaderRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    upload: () => {
      upload();
      setStatus(FileUploadStateEnums.Uploading);
    },
    getUid: () => file.uid,
  }));

  // 文件上传
  const upload = () => {
    if (!uploaderRef.current) {
      const uploader = new Uploader();
      uploaderRef.current = uploader;
    }
    uploaderRef.current.upload({
      formData: data,
      name,
      filePath: file.tmpUrl,
      onError(msg?: string) {
        setStatus(FileUploadStateEnums.Fail);
        if (onError) {
          onError(file, msg);
        }
      },
      onProgress(progress: number) {
        if (onProgress) {
          onProgress(progress, file);
        }
      },
      onSuccess(res: ISuccessResponse, fileUrl: string) {
        setStatus(FileUploadStateEnums.Done);
        if (onSuccess) {
          onSuccess(res, fileUrl, file);
        }
      },
    });
  };
  useEffect(() => {
    return () => {
      if (uploaderRef.current) {
        uploaderRef.current.abort();
      }
    };
  }, []);
  useEffect(() => {
    if (status === FileUploadStateEnums.Initial && manual === false) {
      setStatus(FileUploadStateEnums.Uploading);
      upload();
    }
  }, [status, manual]);

  return (
    <View
      className={classNames(
        styles.uploadItem,
        className,
        "uc-uploadlist-item",
        status === FileUploadStateEnums.Fail ? styles.error : ""
      )}
      style={style}
    >
      <Image
        key={getThumUrl(file) || file.url}
        src={getThumUrl(file) || file.url}
        onClick={() => {
          onPreview?.(file);
        }}
        className={classNames(styles.uploadItemIcon, "uc-uploadlist-item-icon")}
      />
      {/* 队列中，等候上传 */}
      {status === FileUploadStateEnums.Initial && (
        <View className={styles.uploadWaiting}>等待中...</View>
      )}
      {/* 进度条 */}
      {/* {status === FileUploadStateEnums.Uploading && (
        <View className={styles.uploadWaiting}>上传中...</View>
      )} */}
      {/* {progress && progress < 100 && (
        <View
          style={{ width: `${progress}%` }}
          className={classNames(styles.uploadItemProgress, 'uc-uploadlist-item-progress')}
        />
      )} */}
      {(canDelete || status === FileUploadStateEnums.Fail) && (
        <Icon
          onClick={(e) => {
            if (onRemove) {
              onRemove(e, file);
            }
          }}
          value="fail"
          className={classNames(
            styles.uploadItemClose,
            "uc-uploadlist-item-close"
          )}
        />
      )}

      <View
        className={classNames(
          styles.uploadItemButtons,
          "uc-uploadlist-item-buttons"
        )}
      >
        {/* 重新上传 */}
        {/* 预览 */}
      </View>
    </View>
  );
};

const Upload = React.forwardRef(InternalUpload);
export default Upload;
