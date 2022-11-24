import type { ResponseData, GameValidData } from "@/types";
import request from "@/utils/request";

/**
 * 创建游戏。
 * @param AddChapterParams
 * @returns
 */
export async function createGame(data: any) {
  return request<ResponseData>("/api/x1x/game/create", {
    method: "POST",
    data,
  });
}
export async function validGame(data: GameValidData) {
  return request<ResponseData>("/api/x1x/game/valid", {
    method: "POST",
    data,
  });
}
export async function getGameInfo(gameId: number | string) {
  return request<ResponseData<any>>(`/api/x1x/game/${gameId}`);
}
