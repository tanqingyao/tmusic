export default function lyricScroll(lyricsArr) {
  const parseLyrics = lyrics => {
    // 正则匹配解析lyc文本，返回数组：{time,text}
    const regexp = /\[\d{2}:\d{2}.\d{2,3}\]/g;
    lyrics.lyric.split("\n").forEach(element => {
      // 1.原歌词中提取time, lyric
      const times = element.match(regexp);
      let time = 0;
      if (times) {
        time = parseRawTime(times[0]);
      }
      const text = element.replaceAll(regexp, "");
      if (lyricsArr.value) {
        lyricsArr.value.lyric.push({ time, text });
      }
    });
    // 2.翻译歌词中提取time,trans
    lyrics.trans.split("\n").forEach(element => {
      const times = element.match(regexp);
      let time = 0;
      if (times) {
        time = parseRawTime(times[0]);
      }
      const text = element.replaceAll(regexp, "");

      if (lyricsArr.value) {
        lyricsArr.value.trans.push({ time, text });
      }
    });
  };
  const parseRawTime = rawStringTime => {
    const [min, sec] = rawStringTime.substring(1, 9).split(":");
    return Number.parseFloat(min) * 60 + Number.parseFloat(sec);
  };
  return {
    parseLyrics
  };
}
