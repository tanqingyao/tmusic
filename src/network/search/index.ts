import { getNeteaseRequest } from "../request";
import {
  collectSearchDefault,
  collectSearchSuggest,
  ComplexTransfrom,
  SongsTransfrom,
  SonglistsTransfrom,
  ArtistsTransfrom,
  AlbumsTransfrom,
  UsersTransfrom
} from "./model";
import { SearchType } from "@/common/constant";

const URL_search = {
  default: "/search/default",
  suggest: "/search/suggest",
  hot: "/search/hot/detail",
  search: "/search",
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
}
export async function getSearchID(
  keywords: string,
  offset: number = 0,
  limit: number = 30,
  type: number = 1
) {
  const { data: id } = await getNeteaseRequest({
    url: URL_search.search,
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
      // 获取热搜关键词,得到的第一首歌曲
      return JSON.parse(data).result.songs[0].id;
    }
  });
  return id;
}

export async function getSearchCloud(
  keywords: string,
  offset: number = 0,
  limit: number = 30,
  type: number = 1018
) {
  const { data } = await getNeteaseRequest({
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
      const result = JSON.parse(data).result;

      let dataTransfrom;
      switch (type) {
        case SearchType.SONGS:
          dataTransfrom = SongsTransfrom(result.songs);
          break;

        case SearchType.PLAYLISTS:
          dataTransfrom = SonglistsTransfrom(result.playlists);
          break;

        case SearchType.ARTISTS:
          dataTransfrom = ArtistsTransfrom(result.artists);
          break;

        case SearchType.ALBUMS:
          dataTransfrom = AlbumsTransfrom(result.albums);
          break;

        case SearchType.USERS:
          dataTransfrom = UsersTransfrom(result.users);
          break;

        default:
          break;
      }
      return dataTransfrom;
    }
  });

  return data;
}

export async function getSearchComplex(
  keywords: string,
  offset: number = 0,
  limit: number = 30,
  type: number = 1018
) {
  const { data } = await getNeteaseRequest({
    url: URL_search.search,
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
      const complexInfo = ComplexTransfrom(JSON.parse(data).result);
      return complexInfo;
    }
  });

  return data;
}
