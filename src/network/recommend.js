import { request } from "./request";

export function _getBanners() {
  return request({
    url: "/recommend/banner"
  });
}

// /recommend/playlist接口的pageNo失效
export function _getSonglistsByCatergory(id = 3317, pageNo = 1, pageSize = 20) {
  return request({
    url: "/recommend/playlist",
    params: {
      id, // 3317: 官方歌单，59：经典，71：情歌，3056：网络歌曲，64：KTV热歌
      pageNo,
      pageSize
    }
  });
}
export class Album {
  constructor(albumInfo) {
    this.id = albumInfo.tid;
    this.cover = albumInfo.cover_url_small;
    this.title = albumInfo.title;
    this.playNum = albumInfo.access_num;
  }
}
