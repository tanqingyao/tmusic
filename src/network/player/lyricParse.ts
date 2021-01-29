export const Lyric_Transfrom = (lyricsArr: {
  lyric: [{ time: number; text: string }];
  trans: [{ time: number; text: string }];
}) => {
  const parseLyrics = (lyrics: { lyric: string; trans: string }) => {
    // 正则匹配解析lyc文本，返回数组：{time,text}
    const regexp = /\[\d{2}:\d{2}.\d{2,3}\]/g;
    lyrics.lyric.split("\n").forEach((line: string) => {
      // 1.原歌词中提取time, lyric
      const times = line.match(regexp);
      let time = 0;
      if (times) {
        time = parseRawTime(times[0]);
      }
      const text = line.replaceAll(regexp, "");
      if (lyricsArr) {
        lyricsArr.lyric.push({ time, text });
      }
    });
    // 2.翻译歌词中提取time,trans
    lyrics.trans.split("\n").forEach((line: string) => {
      const times = line.match(regexp);
      let time = 0;
      if (times) {
        time = parseRawTime(times[0]);
      }
      const text = line.replaceAll(regexp, "");

      if (lyricsArr) {
        lyricsArr.trans.push({ time, text });
      }
    });
  };
  const parseRawTime = (rawStringTime: string) => {
    const [min, sec] = rawStringTime.substring(1, 9).split(":");
    return Number.parseFloat(min) * 60 + Number.parseFloat(sec);
  };
  return {
    parseLyrics
  };
};
