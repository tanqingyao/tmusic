declare interface ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics: ILyrics;
}

declare type ISinger = {
  id: number;
  name: string;
};

declare type IAlbum = {
  id: number;
  name: string;
  url: string;
};
/* 应转化为ILyric */
declare interface ILyricslyric {
  time: number;
  lyric: string;
}
declare interface ILyricstrans {
  time: number;
  trans: string;
}
declare interface ILyrics {
  lyric: ILyricslyric[];
  trans: ILyricstrans[];
  user: string;
}
/* 应转化为ILyric */
declare type ILyric = {
  time: number;
  lyric: string;
  trans: string;
  user: string;
};
