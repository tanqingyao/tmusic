declare interface ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics: ILyrics;
  mv?: string;
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
declare type ILyric = {
  time: number;
  lyric: string;
  trans: string;
  user?: string;
};
