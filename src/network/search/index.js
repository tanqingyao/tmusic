import { getNeteaseRequest } from "../request";
import {
  collectSearchDefault,
  collectSearchSuggest,
  collectSearchHot,
  collectSearchCloud
} from "./model";

const URL_search = {
  default: "/search/default",
  suggest: "/search/suggest",
  hot: "/search/hot/detail",
  cloudsearch: "/cloudsearch"
};

export const getSearchDefault = async () => {
  const res = await getNeteaseRequest({
    url: URL_search.default
  });
  return collectSearchDefault(res);
};

export const getSearchSuggest = async keywords => {
  const res = await getNeteaseRequest({
    url: URL_search.suggest,
    params: {
      keywords,
      type: "mobile"
    }
  });
  return collectSearchSuggest(res);
};

export async function getSearchHot() {
  const res = await getNeteaseRequest({
    url: URL_search.hot
  });
  return collectSearchHot(res);
}

export async function getSearchCloud(
  keywords,
  offset = 0,
  limit = 30,
  type = 1
) {
  const res = await getNeteaseRequest({
    url: URL_search.cloudsearch,
    params: {
      keywords,
      // 分页
      offset,
      //数量
      limit,
      //搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
      type
    }
  });
  return collectSearchCloud(res);
}
