import { ComputedRef, ref, watchEffect, Ref } from "vue";
export default function lyricScroll(currentTime: ComputedRef, lyricsArr: Ref) {
  //播放歌词位置
  let currentLyricRef: HTMLElement = lyricsArr.value.el[0];
  let oldLyricRef: HTMLElement;
  const scroll: Ref = ref(null);
  const jumper = (currentEl: HTMLElement, time = 1000, offsetY = 255) => {
    if (currentEl && scroll.value) {
      const height = currentEl.offsetTop + 0.5 * currentEl.offsetHeight;
      scroll.value.scrollTo(0, -height + offsetY, time);
    }
  };
  const styler = (
    prevEl: HTMLElement,
    currentEl: HTMLElement,
    color: string = "#fff"
  ) => {
    if (prevEl !== currentEl && prevEl && currentEl) {
      // 改变歌词样式
      if (prevEl.style && currentEl.style) {
        prevEl.style.color = "";
        currentEl.style.color = color;
      }
    }
  };
  const findLyricRef = (time: number) => {
    if (!lyricsArr.value.lyric) {
      return;
    }
    // 该时间点所处的时间段的index
    const index = lyricsArr.value.lyric.findIndex(
      (el: ILyric, i: number, arr: ILyric[]) => {
        const cond1 = arr[i + 1] && arr[i + 1].time > time;
        const cond2 = el && el.time < time;
        return i + 1 === arr.length ? cond2 : cond1 && cond2;
      }
    );
    if (index !== -1) {
      oldLyricRef = currentLyricRef;
      currentLyricRef = lyricsArr.value.el[index];
    }
  };
  const styleWatcher = () => {
    return watchEffect(() => {
      findLyricRef(currentTime.value);
      styler(oldLyricRef, currentLyricRef);
    });
  };

  const jumpWatcher = () => {
    return watchEffect(() => {
      const watch = currentTime.value;
      jumper(currentLyricRef, undefined, undefined);
    });
  };
  return {
    scroll,
    currentLyricRef,
    styleWatcher,
    jumpWatcher,
    jumper,
    styler
  };
}
