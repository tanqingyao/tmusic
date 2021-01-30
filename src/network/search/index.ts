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

export const getSearchSuggest = async (keywords: string) => {
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
  const { data: hots } = await getNeteaseRequest({
    url: URL_search.hot,

    transformResponse: data => {
      const hots = JSON.parse(data).data.map((suggest: any) => {
        return {
          score: suggest.score,
          key: suggest.searchWord,
          iconL: suggest.iconUrl
        };
      });
      return hots;
    }
  });
  return hots;
  // return collectSearchHot(res);
}

export async function getSearchCloud(
  keywords: string,
  offset: number = 0,
  limit: number = 30,
  type: number = 1
) {
  const { data: cloudsearch } = await getNeteaseRequest({
    url: URL_search.cloudsearch,
    params: {
      keywords,
      // 分页
      offset,
      //数量
      limit,
      //搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
      type
    },

    transformResponse: data => {
      return JSON.parse(data);
    }
  });
  console.log(cloudsearch);

  // return collectSearchCloud(res);
}