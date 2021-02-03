export const enum ListSetting {
  SONGS = "单曲",
  PLAYLISTS = "歌单",
  ARTISTS = "艺人",
  ALBUMS = "专辑",
  USERS = "用户",
  COVER_ROUND = "round",
  COVER_SQUARE = "square"
}

//搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const enum SearchType {
  SONGS = 1,
  PLAYLISTS = 1000,
  ARTISTS = 100,
  ALBUMS = 10,
  USERS = 1002
}
