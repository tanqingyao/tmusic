import { AxiosResponse } from "axios";

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
export const Lyric_Transfrom = (origin: string, trans: string) => {
  const lyricsArr: ILyric[] = [];

  const lrcArr = origin.split("\n");
  const transArr = trans.split("\n");
  for (let i = 0, j = 0; i < lrcArr.length, j < transArr.length; ) {
    /* 正则解析歌词 */
    let lrc: [number, string] = regexpLyric(lrcArr[i]);
    let trans: [number, string] = regexpLyric(transArr[j]);

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
    if (lrc[1] && trans[1]) {
      lyricsArr.push({ time, lyric: lrc[1], trans: trans[1] });
    }
  }
  return lyricsArr;
};
