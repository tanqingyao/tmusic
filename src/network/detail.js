import { request } from "./request";

export function _getSonglistById(id) {
  return request({
    url: "/songlist",
    params: {
      id
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
