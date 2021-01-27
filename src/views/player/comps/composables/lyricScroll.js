import { ref, watch, watchEffect } from "vue";
export default function lyricScroll(currentTime, lyricsArr, jumper, styler) {
  //播放歌词位置
  let currentLyricRef = null;
  let oldLyricRef = null;
  const findLyricRef = time => {
    // 该时间点所处的时间段的index
    const index = lyricsArr.value.lyric.findIndex((el, i, arr) => {
      const cond1 = arr[i + 1] && arr[i + 1].time > time;
      const cond2 = el && el.time < time;
      return i + 1 === arr.length ? cond2 : cond1 && cond2;
    });
    if (index !== -1) {
      oldLyricRef = currentLyricRef;
      currentLyricRef = lyricsArr.value.el[index];
    }
  };
  const lyricWatcher = log => {
    return watchEffect(() => {
      findLyricRef(currentTime.value);
      styler(oldLyricRef, currentLyricRef);
    });
  };

  const jumpWatcher = log => {
    return watchEffect(() => {
      const watch = currentTime.value;
      jumper(currentLyricRef, undefined, undefined);
    });
  };
  return {
    currentLyricRef,
    lyricWatcher,
    jumpWatcher
  };
}
