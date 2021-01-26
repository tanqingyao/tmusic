import { getNeteaseRequest } from "../request";
import { collectSongUrl } from "./model";
export const getSongUrl = async ids => {
  /* 批量获取:用数组接收多个id,最终以逗号连接 */
  const id = Array.isArray(ids) ? ids.join(",") : ids;
  const res = await getNeteaseRequest({
    url: "/song/url",
    params: {
      id
    }
  });
  return collectSongUrl(res);
};
