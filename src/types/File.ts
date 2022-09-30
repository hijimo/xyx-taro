import type { FileUploadStateEnums } from "@/enums";
export const orginFileSymbol = Symbol("orginFileSymbol");

export interface File {
  name: string;
  size: string | number;
  status: FileUploadStateEnums;
  type: string;
  uid: string;
  url: string;
  tmpUrl: string;
  progress?: number;
  error?: boolean;
}
