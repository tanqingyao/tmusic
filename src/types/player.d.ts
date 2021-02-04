declare interface ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics: ILyrics;
  mv?: string;
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
