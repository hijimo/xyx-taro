import React, { FC, useState, useRef, useEffect } from "react";
import Taro, { previewImage, openDocument, downloadFile } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import classNames from "classnames";
import { produce } from "immer";
import _isObject from "lodash/isObject";
import _map from "lodash/map";
import _every from "lodash/every";
import _get from "lodash/get";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import useControlled from "@/hooks/useControlled";
import { ISuccessResponse } from "@/utils/Uploader";
import { getFileMIME, getExtname, isVideo, isPdf } from "@/utils/file";
import { File } from "@/types";
import UploadItem, {
  getPreviewUrl,
  UploadProps,
  RefUploadProps,
} from "./Upload";
import { FileUploadStateEnums } from "@/enums";

import styles from "./index.module.less";

// 使用 ref保存 所上传的文件状态。
// ref 是一个Map 对象， key = uid, value = status
// onChange的时候返回getFinalFileList,组合 map 和files列表
// 队列在add、success、fail时判断上传，最多上传文件数为5个。
interface MediaType {
  /** 只能拍摄视频或从相册选择视频 */
  video;
  /** 只能拍摄图片或从相册选择图片 */
  image;
  /** 从聊天历史 */
  file;
}

/**
 * 最大同时上传数量
 */
const MAX_UPLOAD_COUNT = 3;
export interface UploadListProps extends UploadProps {
  // file 原生 props
  accept?: string;
  capture?: boolean | "user" | "environment";
  multiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
  // ['image', 'video']
  mediaType?: Array<keyof MediaType>;
  canDelete?: boolean;
  annexGroup?: number;
  annexType?: number;
  // 已上传文件列表。
  fileList?: File[];
  // 默认上传方案
  uploadText?: string;
  // 最大上传文件大小。单位KB
  maxSize?: number;
  /**
   * 最大上传数量
   */
  maxLength?: number;
  // before上传，返回false会终止后面动作。
  onBeforeUpload?: (fileList: File[]) => boolean | undefined;
  // 当文件进度发生变更、文件数量、上传状态等 发生变更
  onChange?: (fileList: File[]) => void;
  //
  renderAdd?: () => React.ReactElement;
}
export interface MediaFile {
  /**
   * 本地临时文件路径 (本地路径)
   */
  tempFilePath: string;
  /**
   * 视频的时间长度
   */
  duration?: number;
  /**
   * 视频的高度
   */
  height?: number;
  /**
   * 视频的宽度
   */
  width?: number;
  /**
   * 本地临时文件大小，单位 B
   */
  size: number; //单位B
  /**
   * 文件类型
   */
  fileType?: "video" | "image";
}

const getMaxSize = (file: File, maxSize: any | number) =>
  _isObject(maxSize) ? _get(maxSize, file.type) : maxSize;

const checkIsSizeOut = (file: File, maxSize: number) => {
  const max = getMaxSize(file, maxSize);
  return +file.size / 1024 > max;
};

export const hasUploadingFile = (fileList: File[]) => {
  let uploading = false;
  _every(fileList, (file) => {
    uploading =
      file.status !== FileUploadStateEnums.Done && file.status !== undefined;
    return !uploading;
  });
  return uploading;
};
const inAccpetList = (type: string, accpet: string) => {
  if (!accpet || !type) return true;

  const accpetList = accpet
    .split(",")
    .filter((it) => it === type || getFileMIME(it).includes(type));
  return accpetList && accpetList.length > 0;
};

const formatFileList = (
  tempfiles: MediaFile[],
  annexGroup?: number,
  annexType?: number
): File[] =>
  _map(tempfiles, (file: MediaFile) => {
    const name = file.tempFilePath.split("/").pop() || "";
    const { size, tempFilePath: tmpUrl } = file;
    const uid = `uc-upload-${new Date().valueOf()}-${Math.floor(
      Math.random() * 1000000
    )}`;
    return {
      name,
      size,
      tmpUrl,
      url: "",
      annexGroup: annexGroup || 0,
      annexType: annexType || 0,
      uid,
      type: getFileMIME(getExtname(tmpUrl)),
      status: FileUploadStateEnums.Initial,
      progress: 0,
      error: undefined,
    };
  });
const UploadList: FC<UploadListProps> = ({
  accept = "image/png,image/jpeg,image/gif",
  className,
  name = "file",
  data,
  style,
  fileList,
  annexGroup,
  mediaType = ["image"],
  annexType,
  canDelete,

  maxSize = 10240,
  // 最大文件上传数量
  maxLength = Infinity,
  onBeforeUpload,
  onProgress,
  onChange,
  onSuccess,
  onError,
  renderAdd,
}) => {
  const [files, handleFiles] = useControlled<File[]>({
    controlled:
      fileList?.map((f) => ({
        ...f,
        status: f.status || FileUploadStateEnums.Done,
      })) || [],
    default: [],
    name: "UploadList",
    state: "fileList",
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const filesStatusRef = useRef(new Map<string, File>());
  const uploaderRef = useRef(new Map<string, React.Ref<RefUploadProps>>());
  const timer = useRef<any>(-1);

  const beforeUpload = (orginFileList: File[]) => {
    // 文件格式非法

    const isNotAllowFile = _map(orginFileList, (file: File) =>
      inAccpetList(file.type, accept || "")
    ).includes(false);
    if (isNotAllowFile) {
      Taro.showToast({
        title: "不允许的文件格式",
        icon: "none",
      });
      return false;
    }
    // 文件数量超出
    const isLenOut = files.length + orginFileList.length > maxLength;
    if (isLenOut) {
      Taro.showToast({
        title: `文件数量不能超过 ${maxLength} 个`,
        icon: "none",
      });
      return false;
    }
    // 文件大小溢出
    const isSizeOut = _map(orginFileList, (file: File) =>
      checkIsSizeOut(file, maxSize || Infinity)
    ).indexOf(true);
    if (isSizeOut >= 0) {
      Taro.showToast({
        title: `文件大小不能超过 ${getMaxSize(
          orginFileList[isSizeOut],
          maxSize
        )} KB`,
        icon: "none",
      });

      return false;
    }

    if (onBeforeUpload) {
      return !(onBeforeUpload(orginFileList) === false);
    }

    return true;
  };

  const syncFileStatus = (newFileList: File[]) => {
    return newFileList.map((f) => {
      return {
        ...f,
        ...filesStatusRef.current.get(f.uid),
      };
    });
  };
  const appendToList = (orginFiles: File[]) => {
    const newFileList = [...files, ...orginFiles];

    orginFiles.forEach((f) => {
      filesStatusRef.current.set(f.uid, f);
    });

    handleFiles(newFileList);

    onChange?.(syncFileStatus(newFileList));
  };

  const startUpload = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const uploading: string[] = [];
      const initial: string[] = [];

      let status: string[] = [];

      filesStatusRef.current.forEach((v, k) => {
        status.push(`${k}:${v.status}`);
      });

      filesStatusRef.current.forEach((v, k) => {
        if (v.status === FileUploadStateEnums.Initial) {
          initial.push(k);
        } else if (v.status === FileUploadStateEnums.Uploading) {
          uploading.push(k);
        }
      });
      if (uploading.length < MAX_UPLOAD_COUNT) {
        let i = initial.length;
        let n = MAX_UPLOAD_COUNT - uploading.length;
        while (n > 0 && i > 0) {
          const fileUid = initial[initial.length - i];
          const uploader = uploaderRef.current.get(fileUid);
          if (uploader !== undefined) {
            const origin = filesStatusRef.current.get(fileUid) as File;
            filesStatusRef.current.set(fileUid, {
              ...origin,
              status: FileUploadStateEnums.Uploading,
            });

            uploader?.upload();
            n--;
          }
          i--;
        }
      }

      if (initial.length > 0) {
        startUpload();
      }
    }, 1500);
  };
  const update = (origin: File, partOfFile: any) => {
    const o = filesStatusRef.current.get(origin.uid) as File;
    filesStatusRef.current.set(origin.uid, {
      ...o,
      ...partOfFile,
    });

    const nextState = produce(files, (draft) => {
      const target = draft.find((f) => f.uid === origin.uid);
      Object.keys(partOfFile).forEach((key) => {
        target![key] = partOfFile[key];
      });
    });
    onChange?.(syncFileStatus(nextState));
  };

  const handleUploadRefCb = (uploader: React.Ref<RefUploadProps>) => {
    if (uploader !== null) {
      uploaderRef.current.set(uploader.getUid(), uploader);
      startUpload();
    }
  };
  const handleError = (file: File, msg?: string) => {
    update(file, { status: FileUploadStateEnums.Fail });
    if (onError) {
      onError(file, msg);
    }
  };
  const handleSuccess = (
    res: ISuccessResponse,
    fileUrl: string,
    file: File
  ) => {
    update(file, { status: FileUploadStateEnums.Done, url: fileUrl });

    if (onSuccess) {
      onSuccess(res, fileUrl, file);
    }
  };
  const handleProgress = (progress: number, file: File) => {
    if (onProgress) {
      onProgress(progress, file);
    }
  };
  const handleRemove = (e, file: File) => {
    const nextState = produce(files, (draft) => {
      const idx = draft.findIndex((f) => f.uid === file.uid);
      if (idx >= 0) {
        draft.splice(idx, 1);
      }
    });
    filesStatusRef.current.delete(file.uid);
    uploaderRef.current.delete(file.uid);
    onChange?.(syncFileStatus(nextState));
    // 不判断是否正在上传中。
    handleFiles(nextState);
  };

  const handlePreview = (f: File) => {
    if (isVideo(f.url || f.name)) {
      wx.previewMedia({
        sources: [
          {
            url: f.url,
            type: "video",
          },
        ],
      });
    } else if (isPdf(f.url || f.name)) {
      if (isDownloading) return;

      setIsDownloading(true);
      downloadFile({
        url: f.url,
        success: ({ tempFilePath }) => {
          openDocument({
            filePath: tempFilePath,
          });
        },
        complete: () => {
          setIsDownloading(false);
        },
      });
    } else {
      previewImage({
        current: getPreviewUrl(f) || f.url,
        urls: files?.map((item) => getPreviewUrl(item) || item.url),
      });
    }
  };

  const handleChooseImage = () => {
    if (mediaType.includes("file")) {
      Taro.chooseMessageFile({
        count: maxLength - files.length,
        success: ({ tempFiles }) => {
          const orginFiles = formatFileList(
            tempFiles.map((it) => ({
              ...it,
              tempFilePath: it.path,
            })),
            annexGroup,
            annexType
          );
          if (orginFiles && !beforeUpload(orginFiles)) {
            // 清空选择内容
            return false;
          }
          appendToList(orginFiles);
        },
      });
      return;
    }
    Taro.chooseMedia({
      count: maxLength - files.length,
      sizeType: ["compressed", "original"],
      mediaType: mediaType,
      maxDuration: 60,
      sourceType: ["album", "camera"],

      success: ({ tempFiles }) => {
        const orginFiles = formatFileList(tempFiles, annexGroup, annexType);
        if (orginFiles && !beforeUpload(orginFiles)) {
          // 清空选择内容
          return false;
        }
        appendToList(orginFiles);
      },
    });
  };

  return (
    <View
      className={classNames(className, styles.uploadList, "uc-uploadlist")}
      style={style}
    >
      {files.length < maxLength &&
        (renderAdd ? (
          React.cloneElement(renderAdd(), {
            onClick: handleChooseImage,
          })
        ) : (
          <View className={styles.listitem}>
            <View
              onClick={handleChooseImage}
              className={classNames(styles.uploadAdd, "uc-uploadlist-add")}
            >
              <Image
                src="https://img.honmatech.com/assets/components/upload.png"
                className={styles.img}
              />
            </View>
          </View>
        ))}

      {_map(files, (file: File) => (
        <View
          className={classNames(styles.listitem, "uc-uploadlist-listitem")}
          key={file.uid}
        >
          <UploadItem
            className={styles.uploadItem}
            file={file}
            ref={handleUploadRefCb}
            onPreview={handlePreview}
            canDelete={canDelete}
            manual
            onRemove={handleRemove}
            name={name}
            data={data}
            onProgress={handleProgress}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </View>
      ))}
    </View>
  );
};

export default UploadList;
