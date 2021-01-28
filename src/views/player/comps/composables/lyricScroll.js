import { ref, watchEffect } from "vue";
export default function lyricScroll(currentTime, lyricsArr) {
  //播放歌词位置
  let currentLyricRef = null;
  let oldLyricRef = null;
  const scroll = ref(null);
  const jumper = (currentEl = undefined, time = 1000, offsetY = 255) => {
    if (currentEl) {
      const height = currentEl.offsetTop + 0.5 * currentEl.offsetHeight;
      scroll.value.scrollTo(0, -height + offsetY, time);
    }
  };
  const styler = (prevEl, currentEl, color = "#fff") => {
    if (prevEl !== currentEl && prevEl && currentEl) {
      // 改变歌词样式
      if (prevEl.style && currentEl.style) {
        prevEl.style.color = "";
        currentEl.style.color = color;
      }
    }
  };
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
    scroll,
    currentLyricRef,
    lyricWatcher,
    jumpWatcher,
    jumper,
    styler
  };
}
