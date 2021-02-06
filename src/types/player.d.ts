declare interface ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics?: ILyric;
  mv?: string;
}
declare interface ISonglist {
  id: number;
  creatorUrl: string;
  creatorname: string;
  cover: string;
  name: string;
  description: string;
  subscribedCount: number;
  trackCount: number;
  playCount: number;
  shareCount: number;
  commentCount: number;

  songIds: { id: number }[];
  desc: string;
}
declare interface ISinger {
  id: number;
  name: string;
}

declare interface IAlbum {
  id: number;
  name: string;
  url: string;
}
declare interface ILyric {
  time: number;
  lyric: string;
  trans: string;
  user?: string;
}
