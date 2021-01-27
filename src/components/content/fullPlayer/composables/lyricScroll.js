import { ref, watch } from "vue";
export default function lyricScroll(currentTime, lyricsArr, jumper, styler) {
  //播放歌词位置
  let currentLyricRef = ref({});
  let oldLyricRef = ref({});
  const findLyricRef = time => {
    // 该时间点所处的时间段的index
    const index = lyricsArr.value.lyric.findIndex((el, i, arr) => {
      const cond1 = arr[i + 1] && arr[i + 1].time > time;
      const cond2 = el && el.time < time;
      return i + 1 === arr.length ? cond2 : cond1 && cond2;
    });
    if (index !== -1) {
      oldLyricRef.value = currentLyricRef.value;
      currentLyricRef.value = lyricsArr.value.el[index];
    }
  };
  const lyricWatcher = log => {
    return watch(
      currentTime,
      (newVal, oldVal) => {
        // console.log(log);
        // console.log(log, oldLyricRef.value, currentLyricRef.value);
        findLyricRef(newVal);
        styler(oldLyricRef.value, currentLyricRef.value);
      },
      {
        immediate: true
      }
    );
  };

  const jumpWatcher = log => {
    return watch(
      currentTime,
      (newVal, oldVal) => {
        // console.log(log);
        // console.log(log, oldLyricRef.value, currentLyricRef.value);
        // findLyricRef(newVal);
        jumper(
          oldLyricRef.value,
          currentLyricRef.value,
          undefined,
          undefined,
          "scroll jumper"
        );
      },
      {
        immediate: true
      }
    );
  };
  return {
    currentLyricRef,
    lyricWatcher,
    jumpWatcher
  };
}
