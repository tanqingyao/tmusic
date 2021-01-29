import { AxiosResponse } from "axios";

export const transfromSongUrl = (res: AxiosResponse) => {
  return res.data.data;
};

export const collectSongInfo = (res: AxiosResponse) => {
  return res.data.songs;
};

export const collectSongLyric = (res: AxiosResponse) => {
  return res.data;
};

export class Song implements ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics: ILyrics;
  constructor(songInfo: any, songUrl: any, lyrics: any) {
    this.id = songInfo.id;
    this.name = songInfo.name;
    this.singers = songInfo.ar.map((singer: ISinger) => {
      return {
        id: singer.id,
        name: singer.name
      };
    });
    this.album = {
      id: songInfo.al.id,
      name: songInfo.al.name,
      url: songInfo.al.picUrl
    };

    this.url = songUrl.url;

    this.lyrics = {
      lyric: lyrics.lrc.lyric,
      trans: lyrics.tlyric.lyric,
      user: lyrics.transUser
    };
  }
}
