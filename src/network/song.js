import request from "./request";

/* 批量获取:用数组接收多个id,最终以逗号连接 */
export function _getSongUrlById(ids) {
  let id = Array.isArray(ids) ? ids.join(",") : ids;
  return request({
    url: "/song/urls",
    params: {
      id
    }
  });
}
/* 批量获取:用数组接收多个id,最终以逗号连接 */
export function _getSongInfoById(ids) {
  let songmids = Array.isArray(ids) ? ids.join(",") : ids;
  return request({
    url: "/song/batch",
    params: {
      songmids
    }
  });
}
/* 批量获取:用数组接收多个id,最终以逗号连接 */
export function _getLyricById(ids) {
  let songmid = Array.isArray(ids) ? ids.join(",") : ids;
  return request({
    url: "/lyric",
    params: {
      songmid
    }
  });
}

export class Song {
  constructor(songInfo, multiUrl, album, lyrics) {
    this.id = songInfo.track_info.mid;
    this.name = songInfo.track_info.name;
    this.singer = songInfo.track_info.singer[0].name;

    this.url = multiUrl;

    this.albumImg = album.picUrl;

    this.lyric = lyrics.lyric;
    this.trans = lyrics.trans;
  }
}
