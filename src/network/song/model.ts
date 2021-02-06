import { AxiosResponse } from "axios";

export class Song implements ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics?: ILyric;
  constructor(songInfo: SongInfo, songUrl: any) {
    console.log(songInfo, songUrl);

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
  }
}

export const transfromSongUrl = (res: AxiosResponse) => {
  return res.data.data;
};

export const collectSongInfo = (res: AxiosResponse) => {
  return res.data.songs;
};

const parseRawTime = (rawStringTime: string): number => {
  const [min, sec] = rawStringTime.substring(1, 9).split(":");
  return Number.parseFloat(min) * 60 + Number.parseFloat(sec);
};
const regexpLyric = (line: string): [number, string] => {
  const regexp = /\[\d{2}:\d{2}.\d{2,3}\]/g;
  let time: number;
  let lyc: string;
  if (line) {
    const times = line.match(regexp);
    if (times) {
      time = parseRawTime(times[0]);
    } else {
      time = 0;
    }
    lyc = line.replaceAll(regexp, "");
  } else {
    time = 0;
    lyc = "";
  }
  return [time, lyc];
};
export const Lyric_Transfrom = (originLrc: string, transLrc: string) => {
  const lyricsArr: ILyric[] = [];

  const lrcArr = originLrc.split("\n");
  const transArr = transLrc.split("\n");
  let i = 0,
    j = 0;
  // 合并原词和翻译
  while (i < lrcArr.length || j < transArr.length) {
    /* 正则解析歌词 */
    let lrc: [number, string] = regexpLyric(lrcArr[i]);
    let trans: [number, string];
    // 没有翻译歌词的情况
    if (j < transArr.length) {
      trans = regexpLyric(transArr[j]);
    } else {
      trans = [lrc[0], ""];
    }

    let time = 0;
    if (lrc[0] === trans[0]) {
      time = lrc[0];
      i += 1;
      j += 1;
    } else if (lrc[0] < trans[0]) {
      time = lrc[0];
      i += 1;
    } else if (lrc[0] > trans[0]) {
      time = trans[0];
      j += 1;
    }
    // 排除空行
    if (lrc[1] || trans[1]) {
      lyricsArr.push({ time, lyric: lrc[1], trans: trans[1] });
    }
  }
  return lyricsArr;
};
